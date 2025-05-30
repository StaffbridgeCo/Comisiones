//frontend/src/PrintableView.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { calculateCommissionData } from './components/calculateCommissions'; 
import SugerenciasPorcentaje from './components/SugerenciasPorcentaje'

interface Printable {
  load_id: string;
  billing_date: string;
  customer: string;
  broker: string;
  percentage?: number;
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

  //esto es para la tabla de porcentajes
  const [showSuggestions, setShowSuggestions] = useState(false);

  

// Esta es la función que se llama desde SugerenciasPorcentaje Tabla principal
const manejarAplicacionDePorcentajes = (sugerencias: { empresa: string; porcentaje: number }[]) => {
  const nuevos = { ...percentages };

mainTableData.forEach((fila) => {
  const sugerencia = sugerencias.find(
    (s) => s.empresa.toLowerCase().trim() === fila.customer.toLowerCase().trim()
  );

  if (sugerencia) {
    nuevos[fila.load_id] = sugerencia.porcentaje.toString();
  }
});
// Para adjustments
  adjustments.forEach((adj) => {
    const sugerencia = sugerencias.find(
      (s) => s.empresa.toLowerCase().trim() === adj.customer.toLowerCase().trim()
    );
    if (sugerencia) {
      nuevos[adj.load_id] = sugerencia.porcentaje.toString();
    }
  });


  setPercentages(nuevos);
  setShowSuggestions(false);
};





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
  setPercentages((prev) => ({
    ...prev,
    [loadId]: value,
  }));
};



    //componente de logica para calcular
    const {
    adjustments,
    mainTableData,
    totalGrossMargin,
    totalCommissions,
    totalAdjustmentCount,
    totalAdjustmentCommissions,
    totalGeneral,
  } = calculateCommissionData(data, percentages);


return (
  <div className="p-4 relative">
    <h1 className="text-xl font-bold mb-4">Consulta de Envíos por Broker</h1>

    {/* Filtros */}
    <div id="filtros-envios" className="flex flex-col md:flex-row gap-4 mb-4">
      <select
        value={broker}
        onChange={(e) => setBroker(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Selecciona un broker</option>
        {brokers.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Volver al Dashboard
        </button>
        {[
          'calume', 'dave', 'orqui', 'steve', 'johan', 'shaun', 'jay m', 'john',
          'ralph', 'penny', 'sal', 'santi', 'juana', 'florez', 'benton', 'felipe',
          'andres', 'blake', 'pitman farms inc', 'genaro pit'
          ].includes(broker.toLowerCase()) && (
          <button
            onClick={() => setShowSuggestions((prev) => !prev)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Sugerencia de porcentaje
          </button>
          )}

      </div>
    </div>


{showSuggestions && broker && (
  <SugerenciasPorcentaje
    broker={broker.toLowerCase()}
    onAplicar={manejarAplicacionDePorcentajes}
    onClose={() => setShowSuggestions(false)}
  />
)}




    {/* Resultados */}
    {data.length > 0 ? (
      <>
        {/* Tabla principal */}
        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-2 py-1">Load Id</th>
              <th className="border border-black px-2 py-1">Billing Date</th>
              <th className="border border-black px-2 py-1">Customer</th>
              <th className="border border-black px-2 py-1">Broker</th>
              <th className="border border-black px-2 py-1">Percentage (%)</th>
              <th className="border border-black px-2 py-1">Gross Marging</th>
              <th className="border border-black px-2 py-1">Commision</th>
            </tr>
          </thead>
          <tbody>
            {mainTableData.map((d) => {
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
                  
  {/* Editable Percentage */}
<td className="border border-black px-2 py-1">
  <input
    type="number"
    step="any"
    min="0"
    max="100"
    className="w-20 px-1 border border-black"
    value={percentages[d.load_id] ?? ''}
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
        <h2 className="text-lg font-semibold mb-2">Comisiones</h2>
        <table className="w-1/3 border-collapse border border-black mb-6">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-black px-2 py-1">Total Commissions</th>
              <th className="border border-black px-2 py-1">Total Gross Margin</th>
              <th className="border border-black px-2 py-1">amount of commissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1">${totalCommissions.toFixed(2)}</td>
              <td className="border border-black px-2 py-1">${totalGrossMargin.toFixed(2)}</td>
              <td className="border border-black px-2 py-1">{mainTableData.length}</td>
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
                <th className="border border-black px-2 py-1">Percentage (%)</th>
                <th className="border border-black px-2 py-1">Commissions</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((adj) => {
                const inputValue = percentages[adj.load_id] ?? '';
                const parsedPercentage = parseFloat(inputValue);
                const gross = parseFloat(adj.gross_margin);
                const resultado =
                  !isNaN(parsedPercentage) && !isNaN(gross)
                    ? (gross * (parsedPercentage / 100)).toFixed(2)
                    : '0.00';

                return (
                  <tr key={adj.load_id}>
                    <td className="border border-black px-2 py-1">{adj.load_id}</td>
                    <td className="border border-black px-2 py-1">{adj.customer}</td>
                    <td className="border border-black px-2 py-1">{adj.description}</td>
                    <td className="border border-black px-2 py-1">${gross.toFixed(2)}</td>
                      {/* Editable Percentage */}
                    <td className="border border-black px-2 py-1">
                    <input
                    type="number"
                    step="any"
                    min="0"
                    max="100"
                    className="w-20 px-1 border border-black"
                    value={percentages[adj.load_id] ?? ''}
                    onChange={(e) => handlePercentageChange(adj.load_id, e.target.value)}
                    />
                    </td>
                    <td className="border border-black px-2 py-1">${resultado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="mt-2 text-gray-600">No hay ajustes para mostrar.</p>
        )}

        {/* Totales de Adjustments */}
<h2 className="text-lg font-semibold mt-6 mb-2">Adjustments Summary</h2>
<table className="w-1/2 border-collapse border border-black mb-6">
  <thead>
    <tr className="bg-yellow-300">
      <th className="border border-black px-2 py-1">Number of settings</th>
      <th className="border border-black px-2 py-1">Total Adjustment Commissions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-black px-2 py-1">{totalAdjustmentCount}</td>
      <td className="border border-black px-2 py-1">${totalAdjustmentCommissions.toFixed(2)}</td>
    </tr>
  </tbody>
</table>


        {/* Tabla de deducciones */}
        <h2 className="text-lg font-semibold mt-6 mb-2">Deductions</h2>
        <table className="w-full border-collapse border border-black mb-4">
          <thead>
            <tr className="bg-red-300">
              <th className="border border-black px-2 py-1">Type</th>
              <th className="border border-black px-2 py-1">Description</th>
              <th className="border border-black px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1">Ejemplo</td>
              <td className="border border-black px-2 py-1">Penalización por atraso</td>
              <td className="border border-black px-2 py-1">$0</td>
            </tr>
          </tbody>
        </table>
{/* Tabla de Totales Generales */}
<h2 className="text-lg font-semibold mt-6 mb-2">grand totals</h2>
<table className="w-1/2 border-collapse border border-black mb-6">
  <thead>
    <tr className="bg-green-300">
      <th className="border border-black px-2 py-1">Description</th>
      <th className="border border-black px-2 py-1">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-black px-2 py-1">Total Comisiones</td>
      <td className="border border-black px-2 py-1">${totalCommissions.toFixed(2)}</td>
    </tr>
    <tr>
      <td className="border border-black px-2 py-1">Total Comisiones de Ajustes</td>
      <td className="border border-black px-2 py-1">${totalAdjustmentCommissions.toFixed(2)}</td>
    </tr>
    {/* <tr>
      <td className="border border-black px-2 py-1">Total Deducciones</td>
      <td className="border border-black px-2 py-1">${totalDeductions.toFixed(2)}</td>
    </tr> */}
    <tr className="font-bold bg-gray-200">
      <td className="border border-black px-2 py-1">Final amount</td>
      <td className="border border-black px-2 py-1">${totalGeneral.toFixed(2)}</td>
    </tr>
  </tbody>
</table>

        
      </>
    ) : (
      <p className="mt-4 text-gray-600">No hay datos para mostrar.</p>
    )}

    
  </div>
  
);
}