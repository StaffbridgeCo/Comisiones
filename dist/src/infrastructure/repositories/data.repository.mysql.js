"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDataRepository = void 0;
const db_1 = require("../../config/db");
class MySQLDataRepository {
    async insertMany(data) {
        const query = `
      INSERT INTO data (
        load_id, dispatched, tractor, trailer, dispatch_type,
        order_taker, dispatcher, dispatcher_terminal, dispatch_status,
        date_created, dispatch_date, pickup_date, delivery_date,
        billing_date, load_terminal, shipper, bill_to, customer_terminal,
        cust_sales_rep, origin, origin_zip, destination, dest_zip,
        miles, trailer_type, load_size, weight, extra_stops,
        freight_charge, fuel, accessorial, total_bill,
        trans_cost, gross_profit, gross_margin, month,
        column1, column2, column3, column4, column5, column6,
        product_category, month2
      ) VALUES ?
    `;
        const values = data.map((row) => Object.values(row));
        await db_1.pool.query(query, [values]);
    }
    async getAll() {
        const [rows] = await db_1.pool.query("SELECT * FROM data");
        return rows;
    }
    // ✅ Nuevo método para verificar si hay Load Ids repetidos
    async findExistingLoadIds(loadIds) {
        if (loadIds.length === 0)
            return [];
        const placeholders = loadIds.map(() => "?").join(",");
        const query = `SELECT load_id FROM data WHERE load_id IN (${placeholders})`;
        const [rows] = await db_1.pool.query(query, loadIds);
        return rows.map((row) => row.load_id);
    }
}
exports.MySQLDataRepository = MySQLDataRepository;
