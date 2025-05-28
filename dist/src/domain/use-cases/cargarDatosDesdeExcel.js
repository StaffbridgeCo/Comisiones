"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargarDatosDesdeExcel = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
// Función para limpiar valores monetarios
function sanitizeCurrency(value) {
    if (typeof value === "number")
        return value;
    if (!value)
        return 0;
    const clean = value
        .toString()
        .replace(/[^\d,-]/g, "") // quitar todo menos dígitos, coma, guion
        .replace(",", ".");
    return parseFloat(clean) || 0;
}
// ✅ Función para formatear fecha como dd/mm/yyyy
function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
// ✅ Función para convertir fechas Excel (string o serial) a formato colombiano
function parseExcelDate(value) {
    if (!value)
        return null;
    let date;
    if (typeof value === "number") {
        const utc_days = Math.floor(value - 25569);
        const utc_value = utc_days * 86400;
        date = new Date(utc_value * 1000);
    }
    else if (typeof value === "string") {
        const [day, month, year] = value.split("/").map(Number);
        if (!day || !month || !year)
            return null;
        date = new Date(year, month - 1, day);
    }
    else {
        return null;
    }
    return formatDateToDDMMYYYY(date);
}
// Función principal para cargar datos desde Excel
const cargarDatosDesdeExcel = async (buffer, dataRepository) => {
    const workbook = xlsx_1.default.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx_1.default.utils.sheet_to_json(sheet);
    console.log(Object.keys(rawData[0]));
    const jsonData = rawData.map((row) => ({
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
    await dataRepository.insertMany(jsonData);
    return jsonData;
};
exports.cargarDatosDesdeExcel = cargarDatosDesdeExcel;
