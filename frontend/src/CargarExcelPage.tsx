//frontend/src/CargarExcelPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Data {
  load_id: string;
  dispatched: string;
  tractor: string;
  trailer: string;
  dispatch_type: string;
  order_taker: string;
  dispatcher: string;
  dispatcher_terminal: string;
  dispatch_status: string;
  date_created: string;
  dispatch_date: string;
  pickup_date: string;
  delivery_date: string;
  billing_date: string;
  load_terminal: string;
  shipper: string;
  bill_to: string;
  customer_terminal: string;
  cust_sales_rep: string;
  origin: string;
  origin_zip: string;
  destination: string;
  dest_zip: string;
  miles: string;
  trailer_type: string;
  load_size: string;
  weight: string;
  extra_stops: string;
  freight_charge: string;
  fuel: string;
  accessorial: string;
  total_bill: string;
  trans_cost: string;
  gross_profit: string;
  gross_margin: string;
  month: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  product_category: string;
  month2: string;
}

// Función auxiliar para formatear fechas y evitar errores con fechas inválidas
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "" : date.toLocaleDateString("es-CO");
};

const CargarExcelPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [datos, setDatos] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get<Data[]>("http://localhost:3000/cargar-excel/datos");
        setDatos(response.data); // Actualizas el estado datos con la info recibida
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  fetchData();
}, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };




const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  setLoading(true);

  try {
    const response = await axios.post<Data[]>(
      "http://localhost:3000/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const nuevosDatos = response.data;

    const loadIdsExistentes = new Set(datos.map(d => String(d.load_id).trim()));
    const loadIdsArchivo = new Set<string>();
    const datosNoDuplicados: Data[] = [];
    let duplicados = 0;

    for (const item of nuevosDatos) {
      const loadId = String(item.load_id).trim();

      if (loadIdsExistentes.has(loadId) || loadIdsArchivo.has(loadId)) {
        duplicados++;
        continue; // Omitimos el duplicado
      }

      loadIdsArchivo.add(loadId);
      datosNoDuplicados.push(item);
    }

    if (duplicados > 0) {
      alert(`Se omitieron ${duplicados} registros duplicados por Load ID repetido.`);
    }

    setDatos(prev => [...prev, ...datosNoDuplicados]);
  } catch (error: any) {
    console.error("Error al subir el archivo:", error);

    // Extraemos el mensaje del backend si existe
    const backendMessage = error.response?.data?.message;

    alert(backendMessage || "Ocurrió un error al subir el archivo.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-8 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Cargar archivo Excel</h1>

      <button
  onClick={() => window.location.href = "http://localhost:5173/EmpresaLogistica/dashboard"}
  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 mb-4"
>
  Volver al Dashboard
</button>

      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Subiendo..." : "Subir archivo"}
      </button>

{datos.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-2">Datos cargados:</h2>

    <div className="overflow-x-auto max-h-[400px] overflow-y-scroll mt-6 mx-auto border rounded-lg p-4 shadow-lg w-[95%] bg-white">
      <table className="table-auto border border-gray-300 w-full text-sm">
        <thead>
                <tr>
<th className="border px-2 py-1">Load ID</th>
      <th className="border px-2 py-1">Dispatched</th>
      <th className="border px-2 py-1">Tractor</th>
      <th className="border px-2 py-1">Trailer</th>
      <th className="border px-2 py-1">Dispatch Type</th>
      <th className="border px-2 py-1">Order Taker</th>
      <th className="border px-2 py-1">Dispatcher</th>
      <th className="border px-2 py-1">Dispatcher Terminal</th>
      <th className="border px-2 py-1">Dispatch Status</th>
      <th className="border px-2 py-1">Date Created</th>
      <th className="border px-2 py-1">Dispatch Date</th>
      <th className="border px-2 py-1">Pickup Date</th>
      <th className="border px-2 py-1">Delivery Date</th>
      <th className="border px-2 py-1">Billing Date</th>
      <th className="border px-2 py-1">Load Terminal</th>
      <th className="border px-2 py-1">Shipper</th>
      <th className="border px-2 py-1">Bill To</th>
      <th className="border px-2 py-1">Customer Terminal</th>
      <th className="border px-2 py-1">Cust Sales Rep</th>
      <th className="border px-2 py-1">Origin</th>
      <th className="border px-2 py-1">Origin Zip</th>
      <th className="border px-2 py-1">Destination</th>
      <th className="border px-2 py-1">Dest Zip</th>
      <th className="border px-2 py-1">Miles</th>
      <th className="border px-2 py-1">Trailer Type</th>
      <th className="border px-2 py-1">Load Size</th>
      <th className="border px-2 py-1">Weight</th>
      <th className="border px-2 py-1">Extra Stops</th>
      <th className="border px-2 py-1">Freight Charge</th>
      <th className="border px-2 py-1">Fuel</th>
      <th className="border px-2 py-1">Accessorial</th>
      <th className="border px-2 py-1">Total Bill</th>
      <th className="border px-2 py-1">Trans Cost</th>
      <th className="border px-2 py-1">Gross Profit</th>
      <th className="border px-2 py-1">Gross Margin</th>
      <th className="border px-2 py-1">Month</th>
      <th className="border px-2 py-1">Column1</th>
      <th className="border px-2 py-1">Column2</th>
      <th className="border px-2 py-1">Column3</th>
      <th className="border px-2 py-1">Column4</th>
      <th className="border px-2 py-1">Column5</th>
      <th className="border px-2 py-1">Column6</th>
      <th className="border px-2 py-1">Product Category</th>
      <th className="border px-2 py-1">Month2</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((d, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{d.load_id}</td>
                    <td className="border px-2 py-1">{d.dispatched}</td>
                    <td className="border px-2 py-1">{d.tractor}</td>
                    <td className="border px-2 py-1">{d.trailer}</td>
                    <td className="border px-2 py-1">{d.dispatch_type}</td>
                    <td className="border px-2 py-1">{d.order_taker}</td>
                    <td className="border px-2 py-1">{d.dispatcher}</td>
                    <td className="border px-2 py-1">{d.dispatcher_terminal}</td>
                    <td className="border px-2 py-1">{d.dispatch_status}</td>
                    <td className="border px-2 py-1">{formatDate(d.date_created)}</td>
                    <td className="border px-2 py-1">{formatDate(d.dispatch_date)}</td>
                    <td className="border px-2 py-1">{formatDate(d.pickup_date)}</td>
                    <td className="border px-2 py-1">{formatDate(d.delivery_date)}</td>
                    <td className="border px-2 py-1">{formatDate(d.billing_date)}</td>
                    <td className="border px-2 py-1">{d.load_terminal}</td>
                    <td className="border px-2 py-1">{d.shipper}</td>
                    <td className="border px-2 py-1">{d.bill_to}</td>
                    <td className="border px-2 py-1">{d.customer_terminal}</td>
                    <td className="border px-2 py-1">{d.cust_sales_rep}</td>
                    <td className="border px-2 py-1">{d.origin}</td>
                    <td className="border px-2 py-1">{d.origin_zip}</td>
                    <td className="border px-2 py-1">{d.destination}</td>
                    <td className="border px-2 py-1">{d.dest_zip}</td>
                    <td className="border px-2 py-1">{d.miles}</td>
                    <td className="border px-2 py-1">{d.trailer_type}</td>
                    <td className="border px-2 py-1">{d.load_size}</td>
                    <td className="border px-2 py-1">{d.weight}</td>
                    <td className="border px-2 py-1">{d.extra_stops}</td>
                    <td className="border px-2 py-1">{d.freight_charge}</td>
                    <td className="border px-2 py-1">{d.fuel}</td>
                    <td className="border px-2 py-1">{d.accessorial}</td>
                    <td className="border px-2 py-1">{d.total_bill}</td>
                    <td className="border px-2 py-1">{d.trans_cost}</td>
                    <td className="border px-2 py-1">{d.gross_profit}</td>
                    <td className="border px-2 py-1">{d.gross_margin}</td>
                    <td className="border px-2 py-1">{d.month}</td>
                    <td className="border px-2 py-1">{d.column1}</td>
                    <td className="border px-2 py-1">{d.column2}</td>
                    <td className="border px-2 py-1">{d.column3}</td>
                    <td className="border px-2 py-1">{d.column4}</td>
                    <td className="border px-2 py-1">{d.column5}</td>
                    <td className="border px-2 py-1">{d.column6}</td>
                    <td className="border px-2 py-1">{d.product_category}</td>
                    <td className="border px-2 py-1">{d.month2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CargarExcelPage;
