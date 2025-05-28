//src/infrastructure/repositories/data.repository.mysql.ts
import { pool } from "../../config/db";
import { Data } from "../../domain/entities/Data";
import { IDataRepository } from "../../domain/repositories/IDataRepository";

export class MySQLDataRepository implements IDataRepository {
  async insertMany(data: Data[]): Promise<void> {
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
    await pool.query(query, [values]);
  }
}
