import React from 'react';

interface Sugerencia {
  empresa: string;
  porcentaje: number;
}

interface Props {
  broker: string;
  onAplicar: (sugerencias: Sugerencia[]) => void;
  onClose: () => void;
}

const sugerenciasPorBroker: Record<string, Sugerencia[]> = {
  'calume': [
    { empresa: 'Viaz Logistica', porcentaje: 32.5 },
    { empresa: 'CONSTANT FLOW LOGISTICS LLC', porcentaje: 2.5 },
    { empresa: 'CHARROS FORWARDING SAS', porcentaje: 2.5 },
    { empresa: 'Amad Logistics LLC', porcentaje: 2.5 },
  ],
  'johan': [
    { empresa: 'TOM LANGE', porcentaje: 40 },
    { empresa: 'Produce experience', porcentaje: 40 },
    { empresa: 'Global Perishable Services dba LanePro LLC', porcentaje: 25 },
    { empresa: 'Plant Source Inc', porcentaje: 40 },
    { empresa: 'Air Transia LLC', porcentaje: 15 },
    { empresa: 'ADVANCE FREIGHT SOLUTIONS INC', porcentaje: 40 },
    { empresa: 'Imaex Trading Company', porcentaje: 40 },
    { empresa: 'Front Row Produce, LLC.', porcentaje: 20 },
  ],
  // Agrega más brokers aquí
};

    const SugerenciasPorcentaje: React.FC<Props> = ({ broker, onAplicar, onClose }) => {
    const sugerencias = sugerenciasPorBroker[broker.toLowerCase()] || [];


  return (
    <div className="absolute right-4 top-28 bg-white border border-gray-300 shadow-lg rounded p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Sugerencias de porcentaje</h3>
        <button onClick={onClose} className="text-red-500 font-bold">✕</button>
      </div>

      <table className="table-auto border-collapse border border-black mb-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black px-2 py-1">Empresa</th>
            <th className="border border-black px-2 py-1">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {sugerencias.map((sug, idx) => (
            <tr key={idx}>
              <td className="border border-black px-2 py-1">{sug.empresa}</td>
              <td className="border border-black px-2 py-1">{sug.porcentaje}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => onAplicar(sugerencias)}
      >
        Aplicar porcentajes
      </button>
    </div>
  );
};

export default SugerenciasPorcentaje;
