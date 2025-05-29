import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Printable {
  load_id: string;
  billing_date: string;
  customer: string;
  broker: string;
  gross_margin: string;
  commissions?: string;
}

const brokers = [
  'Calume', 'Dave', 'Orqui', 'Steve', 'Johan', 'Shaun', 'Jay M', 'John',
  'Ralph', 'Penny', 'Sal', 'Santi', 'Juana', 'Florez', 'Benton', 'Felipe',
  'Andres', 'Blake', 'Pitman Farms Inc', 'Genaro Pit'
];

export default function PrintableView() {
  const [broker, setBroker] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState<Printable[]>([]);
  const [percentages, setPercentages] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (from && to && new Date(from) > new Date(to)) {
      alert('La fecha "desde" no puede ser mayor que la fecha "hasta".');
      return;
    }

    try {
      const params: any = { broker };
      if (from) params.from = from;
      if (to) params.to = to;

      const response = await axios.get<Printable[]>('http://localhost:3000/printable', { params });
      setData(response.data);
    } catch (err) {
      console.error('Error fetching data', err);
      alert('Hubo un error consultando los datos');
    }
  };

  const handlePercentageChange = (loadId: string, value: string) => {
    setPercentages(prev => ({ ...prev, [loadId]: value }));
  };




  const adjustments = data
    .filter(d => parseFloat(d.gross_margin) <= 0)
    .map(d => ({
      ...d,
      description: parseFloat(d.gross_margin) < 0 ? 'Negative margin' : 'Load with no profit',
    }));


  //Cálculos para totales
  const totalGrossMargin = data.reduce((acc, d) => acc + parseFloat(d.gross_margin || '0'), 0);
  const totalCommissions = data.reduce((acc, d) => {
    const percent = parseFloat(percentages[d.load_id] ?? '0');
    const gross = parseFloat(d.gross_margin || '0');
    if (!isNaN(percent) && !isNaN(gross)) {
      return acc + gross * (percent / 100);
    }
    return acc;
  }, 0);


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Consulta de Envíos por Broker</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select value={broker} onChange={(e) => setBroker(e.target.value)} className="border p-2 rounded">
          <option value="">Selecciona un broker</option>
          {brokers.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border p-2 rounded" />

        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">Buscar</button>
        <button onClick={() => navigate('/dashboard')} className="bg-gray-500 text-white px-4 py-2 rounded">Volver al Dashboard</button>
      </div>

      {/* Resultados */}
      {data.length > 0 ? (
        <>
          {/* Tabla principal */}
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-2 py-1">ID</th>
                <th className="border border-black px-2 py-1">Fecha</th>
                <th className="border border-black px-2 py-1">Cliente</th>
                <th className="border border-black px-2 py-1">Broker</th>
                <th className="border border-black px-2 py-1">Percentage (%)</th>
                <th className="border border-black px-2 py-1">Margen</th>
                <th className="border border-black px-2 py-1">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                const inputValue = percentages[d.load_id] ?? '';
                const parsedPercentage = parseFloat(inputValue);
                const gross = parseFloat(d.gross_margin);
                const resultado =
                  !isNaN(parsedPercentage) && !isNaN(gross)
                    ? (gross * (parsedPercentage / 100)).toFixed(2)
                    : '0.00';

                return (
                  <tr key={d.load_id}>
                    <td className="border border-black px-2 py-1">{d.load_id}</td>
                    <td className="border border-black px-2 py-1">{new Date(d.billing_date).toLocaleDateString()}</td>
                    <td className="border border-black px-2 py-1">{d.customer}</td>
                    <td className="border border-black px-2 py-1">{d.broker}</td>
                    <td className="border border-black px-2 py-1">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        max="100"
                        className="w-20 border border-black px-1"
                        value={inputValue}
                        onChange={(e) => handlePercentageChange(d.load_id, e.target.value)}
                      />
                    </td>
                    <td className="border border-black px-2 py-1">${gross.toFixed(2)}</td>
                    <td className="border border-black px-2 py-1">${resultado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totales */}
          <table className="w-1/3 border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-black px-2 py-1">Total Comisiones</th>
                <th className="border border-black px-2 py-1">Total Gross Margin</th>
                <th className="border border-black px-2 py-1">Cantidad Comisiones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1">${totalCommissions.toFixed(2)}</td>
                <td className="border border-black px-2 py-1">${totalGrossMargin.toFixed(2)}</td>
                <td className="border border-black px-2 py-1">{data.length}</td>
              </tr>
            </tbody>
          </table>

          {/* Tabla de ajustes */}
          <h2 className="text-lg font-semibold mb-2">Adjustments</h2>
          {adjustments.length > 0 ? (
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr className="bg-yellow-200">
                  <th className="border border-black px-2 py-1">Load ID</th>
                  <th className="border border-black px-2 py-1">Customer</th>
                  <th className="border border-black px-2 py-1">Description</th>
                  <th className="border border-black px-2 py-1">Gross Margin</th>
                  <th className="border border-black px-2 py-1">Commissions</th>
                </tr>
              </thead>
              <tbody>
                {adjustments.map((adj) => (
                  <tr key={adj.load_id}>
                    <td className="border border-black px-2 py-1">{adj.load_id}</td>
                    <td className="border border-black px-2 py-1">{adj.customer}</td>
                    <td className="border border-black px-2 py-1">{adj.description}</td>
                    <td className="border border-black px-2 py-1">${parseFloat(adj.gross_margin).toFixed(2)}</td>
                    <td className="border border-black px-2 py-1">${adj.commissions ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-2 text-gray-600">No hay ajustes para mostrar.</p>
          )}
        </>
      ) : (
        <p className="mt-4 text-gray-600">No hay datos para mostrar.</p>
      )}
    </div>
  );
}
