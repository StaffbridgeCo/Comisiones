import { useState } from 'react';
import axios from 'axios';

interface Printable {
  load_id: string;
  billing_date: string;
  customer: string;
  broker: string;
  gross_margin: string;
}

const brokers = [
  'Calume',
  'Dave',
  'Orquidea',
  'Tamayo',
  'Johan',
  'Shaun',
  'Jay M',
  'John',
  'Ralph',
  'Penny',
  'Salomon',
  'Santiago',
  'Juana',
  'Florez',
  'Benton',
  'Felipe',
  'Andres',
  'Blake',
  'Vanesa Pit',
  'Genaro Pit'
];
export default function PrintableView() {
  const [broker, setBroker] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState<Printable[]>([]);

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
      </div>

      {data.length > 0 ? (
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Cliente</th>
              <th className="border px-2 py-1">Broker</th>
              <th className="border px-2 py-1">Margen</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.load_id}>
                <td className="border px-2 py-1">{d.load_id}</td>
                <td className="border px-2 py-1">{new Date(d.billing_date).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{d.customer}</td>
                <td className="border px-2 py-1">{d.broker}</td>
                <td className="border px-2 py-1">${d.gross_margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-600">No hay datos para mostrar.</p>
      )}
    </div>
  );
}
