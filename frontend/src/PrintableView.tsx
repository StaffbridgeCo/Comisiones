import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Printable {
  load_id: string;
  billing_date: string;
  customer: string;
  broker: string;
  gross_margin: string;
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Consulta de Envíos por Broker</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select value={broker} onChange={(e) => setBroker(e.target.value)} className="border p-2 rounded">
          <option value="">Selecciona un broker</option>
          {brokers.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border p-2 rounded" />

        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Volver al Dashboard
        </button>
      </div>

      {data.length > 0 ? (
        <table className="w-full border-collapse border border-black">
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
                  <td className="border border-black px-2 py-1">
                    {new Date(d.billing_date).toLocaleDateString()}
                  </td>
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
                  <td className="border border-black px-2 py-1">${d.gross_margin}</td>
                  <td className="border border-black px-2 py-1">${resultado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-600">No hay datos para mostrar.</p>
      )}
    </div>
  );
}
