// src/infrastructure/repositories/printable.repository.mysql.ts

import { pool } from '../../config/db';
import { IPrintableRepository } from '../../domain/repositories/IPrintableRepository';
import { Printable } from '../../domain/entities/Printable';

// ✅ Ya está bien definido
export class MySQLPrintableRepository implements IPrintableRepository {
  async findByBroker(broker: string, from?: string, to?: string): Promise<Printable[]> {
    let query = `
      SELECT 
        d.load_id,
        d.billing_date,
        d.bill_to AS customer,
        d.load_terminal AS broker,
        d.gross_profit AS gross_margin
      FROM data d
      WHERE d.load_terminal = ?
    `;

    const params: any[] = [broker];

    if (from) {
      query += ' AND d.billing_date >= ?';
      params.push(from);
    }

    if (to) {
      query += ' AND d.billing_date <= ?';
      params.push(to);
    }

    const [rows] = await pool.query(query, params);
    return rows as Printable[];
  }
}

export const printableRepositoryMySQL = new MySQLPrintableRepository();
