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
    { empresa: 'Tom Lange', porcentaje: 40 },
    { empresa: 'Produce experience', porcentaje: 40 },
    { empresa: 'Global Perishable Services dba LanePro LLC', porcentaje: 25 },
    { empresa: 'Plant Source Inc', porcentaje: 40 },
    { empresa: 'Air Transia LLC', porcentaje: 15 },
    { empresa: 'ADVANCE FREIGHT SOLUTIONS INC', porcentaje: 40 },
    { empresa: 'Imaex Trading Company', porcentaje: 40 },
    { empresa: 'Front Row Produce, LLC.', porcentaje: 20 },
  ],
  'dave': [
    { empresa: 'Interfresh', porcentaje: 50 },
    { empresa: 'OM PRODUCE', porcentaje: 40 },
    { empresa: 'Calixtro', porcentaje: 47.5 },
    { empresa: 'EW KEAN', porcentaje: 50 },
    { empresa: 'Heavy Haul', porcentaje: 50 },
    { empresa: 'Western Missuri Fruit Sales', porcentaje: 50 },
    { empresa: "A'S Fresh Produce", porcentaje: 45 },
    { empresa: '24TONS', porcentaje: 10 },
    { empresa: 'Set the Stage', porcentaje: 50 },
    { empresa: 'Dayly Fresh', porcentaje: 50 },
    { empresa: 'Fresh Start Produce', porcentaje: 50 },
    { empresa: 'Western Marketing Service', porcentaje: 50 },
    { empresa: 'COPASâ€™ LLC', porcentaje: 50 },
    { empresa: 'Del Campo Produce', porcentaje: 50 },
    { empresa: 'Premier Produce Services LLC', porcentaje: 50 },
    { empresa: 'BOUGH ENTERPRISES LLC', porcentaje: 15 },
    { empresa: 'Pitman Farms Inc', porcentaje: 10 },
    { empresa: 'Q21, LLC', porcentaje: 50 },
    { empresa: 'ROYAL SUN PRODUCE LLC', porcentaje: 50 },
    { empresa: 'Shasta Produce', porcentaje: 50 },
    { empresa: 'Fusion Freedom Investments, LLC', porcentaje: 50 },
    { empresa: 'MTD Produce inc', porcentaje: 45 },
    { empresa: 'Prime Sales, Inc.', porcentaje: 50 },
    { empresa: 'Mexia Pallets LLC', porcentaje: 50 },
    { empresa: 'New Eastern Fresh Produce Corp.', porcentaje: 50 },
    { empresa: 'Fresh Start Produce    Sales, Inc', porcentaje: 50 },
    { empresa: 'Sigma Sales, Inc', porcentaje: 50 },
    { empresa: 'Dawn Produce Corp', porcentaje: 50 },
    { empresa: "Junior's Candy Distribution LLC", porcentaje: 40 },
    { empresa: 'Shasta Produce J', porcentaje: 50 },
    { empresa: 'Martin Produce, Inc.', porcentaje: 40 },
    { empresa: 'Wada Farms Marketing Group, LLC', porcentaje: 50 },
    { empresa: 'Daily Fresh Distributing, Inc.', porcentaje: 47.5 },
    { empresa: 'Mexfresh Produce', porcentaje: 50 },
  ],
  'orqui': [
    { empresa: '24TONS', porcentaje: 15 },
  ],
  'john': [
    { empresa: 'OM produce', porcentaje: 10 },
  ],
  'steve': [
    { empresa: 'Sky falls', porcentaje: 50 },
    { empresa: 'Apache Forest Products', porcentaje: 50 },
    { empresa: 'Integrated logistics solutions', porcentaje: 50 },
    { empresa: 'Midwest Best Produce', porcentaje: 50 },
    { empresa: 'Western Onion', porcentaje: 50 },
    { empresa: 'Skyfall Parts Inc', porcentaje: 50 },
    { empresa: 'Safe Appliances Inc', porcentaje: 50 },
    { empresa: 'Ventas 365 LLC Dba Primex Products', porcentaje: 50 },
    { empresa: 'LATIUM USA TRADING,LLC Dba FOUR SEASONS BUILDING PRODUCTS', porcentaje: 50 },
    { empresa: 'Bolt Technologies Incorporated', porcentaje: 1 },
    { empresa: 'KOLS CONTAINERS', porcentaje: 1 },
    { empresa: 'Wood Plank', porcentaje: 1 },
    { empresa: 'Guzal Cargo Express', porcentaje: 1 },
  ],
  'shaun': [
    { empresa: "My Mother's Delicacies Inc.", porcentaje: 40 },
    { empresa: "Pathmore Food Group dba Inked Bread Co", porcentaje: 40 },
    { empresa: "Pure Fresh Sales, Inc", porcentaje: 40 },

  ],
  'jay m': [
    { empresa: "Mother's Delicacy", porcentaje: 5 },
    { empresa: "My Mother's Delicacies Inc.", porcentaje: 2.5 },
    { empresa: "Pathmore Food Group dba Inked Bread Co", porcentaje: 2.5 },
    { empresa: "Pure Fresh Sales, Inc", porcentaje: 2.5 },
  ],
  'ralph': [
    { empresa: 'SENA FOODS LLC', porcentaje: 30 },
    { empresa: 'Epic Produce', porcentaje: 30 },
    { empresa: 'Seven Seas Fruit', porcentaje: 30 },
    { empresa: 'STANLEY BROS', porcentaje: 30 },
    { empresa: 'Quality Fruit & Veg. Co.', porcentaje: 30 },
    { empresa: 'Premier Produce Services LLC', porcentaje: 5 },
    { empresa: 'GENE WHEELER FARMS', porcentaje: 30 },
    { empresa: 'CRI International Inc', porcentaje: 30 },
    { empresa: 'Arturo Rodriguez', porcentaje: 30 },
    { empresa: 'La Parcela Produce, LLC', porcentaje: 30 },
    { empresa: 'Greenberg Fruit Co', porcentaje: 30 },
  ],
  'santi': [
    { empresa: "America's Trans Logistics", porcentaje: 50 },
    { empresa: 'BTP International', porcentaje: 35 },
    { empresa: '24TONS', porcentaje: 15 },
    { empresa: 'R y C Energy SAS', porcentaje: 25 },
    { empresa: 'BOUGH ENTERPRISES LLC', porcentaje: 35 },
    { empresa: 'Gloval Shipping USA, LLC', porcentaje: 50 },
    { empresa: 'United Globe Cargo, Inc.', porcentaje: 50 },
  ],
};



    const SugerenciasPorcentaje: React.FC<Props> = ({ broker, onAplicar, onClose }) => {
          const keyBroker = broker.toLowerCase().trim();
    const sugerencias = sugerenciasPorBroker[broker.toLowerCase().trim()] || [];

          console.log('broker recibido:', broker);
  console.log('keyBroker:', keyBroker);
  console.log('sugerencias:', sugerencias);
  console.log('broker:', broker, 'broker.toLowerCase():', broker.toLowerCase());


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
