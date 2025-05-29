// src/domain/use-cases/cargarDatosDesdeExcel.ts
import { IDataRepository } from "../../domain/repositories/IDataRepository";
import xlsx from "xlsx";
import { Data } from "../../domain/entities/Data";

// Función para limpiar valores monetarios
function sanitizeCurrency(value: string | number): number {
  if (typeof value === "number") return value;
  if (!value) return 0;

  const clean = value
    .toString()
    .replace(/[^\d,-]/g, "") // quitar todo menos dígitos, coma, guion
    .replace(",", ".");

  return parseFloat(clean) || 0;
}

// Formatear fecha como yyyy-mm-dd (MySQL) sin desfases ni uso de zona horaria
function formatDateToMySQL(year: number, month: number, day: number): string {
  return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

// Convierte fechas de Excel (número o string "dd/mm/yyyy") a formato MySQL sin desfase
function parseExcelDate(value: string | number): string | null {
  if (!value) return null;

  try {
    if (typeof value === "number") {
      const excelSerial = Math.floor(value);
      const correctedSerial = excelSerial > 59 ? excelSerial - 1 : excelSerial;

      // Excel base date: 1899-12-31 (serial 1 = 1900-01-01)
      const baseYear = 1899;
      const baseMonth = 11; // diciembre (0-index)
      const baseDay = 31;

      // Crear fecha base
      const baseDate = new Date(baseYear, baseMonth, baseDay);

      // Sumar días serial sin tocar el tiempo
      const targetDay = baseDate.getDate() + correctedSerial;
      const targetDate = new Date(baseYear, baseMonth, targetDay);

      // Obtener partes sin desfase
      const day = targetDate.getDate();
      const month = targetDate.getMonth() + 1;
      const year = targetDate.getFullYear();

      return formatDateToMySQL(year, month, day);

    } else if (typeof value === "string") {
      const parts = value.split("/");
      if (parts.length !== 3) return null;

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (!day || !month || !year) return null;

      return formatDateToMySQL(year, month, day);
    }

    return null;
  } catch (error) {
    console.error("Error parseando fecha:", value, error);
    return null;
  }
}


// Función principal para cargar datos desde Excel
export const cargarDatosDesdeExcel = async (
  buffer: Buffer,
  dataRepository: IDataRepository
): Promise<Data[]> => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData = xlsx.utils.sheet_to_json<any>(sheet);

  const jsonData: Data[] = rawData.map((row) => ({
    load_id: row["Load Id"] ?? null,
    dispatched: row["Dispatched"] ?? null,
    tractor: row["Tractor"] ?? null,
    trailer: row["Trailer"] ?? null,
    dispatch_type: row["Dispatch Type"] ?? null,
    order_taker: row["Order Taker"] ?? null,
    dispatcher: row["Dispatcher"] ?? null,
    dispatcher_terminal: row["Dispatcher Terminal"] ?? null,
    dispatch_status: row["Dispatch Status"] ?? null,
    date_created: parseExcelDate(row["Date Created"]),
    dispatch_date: parseExcelDate(row["Dispatch Date"]),
    pickup_date: parseExcelDate(row["Pickup Date"]),
    delivery_date: parseExcelDate(row["Delivery Date"]),
    billing_date: parseExcelDate(row["Billing Date"]),
    load_terminal: row["Load Terminal"] ?? null,
    shipper: row["Shipper"] ?? null,
    bill_to: row["Bill To"] ?? null,
    customer_terminal: row["Customer Terminal"] ?? null,
    cust_sales_rep: row["Cust Sales Rep"] ?? null,
    origin: row["Origin"] ?? null,
    origin_zip: row["Origin Zip"] ?? null,
    destination: row["Destination"] ?? null,
    dest_zip: row["Dest Zip"] ?? null,
    miles: Number(row["Miles"]) || 0,
    trailer_type: row["Trailer Type"] ?? null,
    load_size: row["Load Size"] ?? null,
    weight: Number(row["Weight"]) || 0,
    extra_stops: Number(row["Extra Stops"]) || 0,
    freight_charge: sanitizeCurrency(row[" Freight Charge "]),
    fuel: sanitizeCurrency(row["Fuel"]),
    accessorial: sanitizeCurrency(row[" Accessorial "]),
    total_bill: sanitizeCurrency(row[" Total Bill "]),
    trans_cost: sanitizeCurrency(row[" Trans Cost "]),
    gross_profit: sanitizeCurrency(row[" Gross Profit "]),
    gross_margin: sanitizeCurrency(row["Gross Margin"]),
    month: row[" Month "] ?? null,
    column1: row["Column1"] ?? null,
    column2: row["Column2"] ?? null,
    column3: row["Column3"] ?? null,
    column4: row["Column4"] ?? null,
    column5: row["Column5"] ?? null,
    column6: row["Column6"] ?? null,
    product_category: row["Product Category"] ?? null,
    month2: row["Month2"] ?? null,
  }));

  // Validar Load Ids repetidos en la BD antes de insertar
  const loadIds = jsonData.map((d) => d.load_id).filter(Boolean);
  const existingIds = await dataRepository.findExistingLoadIds(loadIds);

  if (existingIds.length > 0) {
    throw new Error(`❌ Los siguientes Load Id ya existen: ${existingIds.join(", ")}`);
  }

  await dataRepository.insertMany(jsonData);
  return jsonData;
};