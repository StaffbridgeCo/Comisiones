// src/infrastructure/repositories/printable.repository.mysql.ts

import { pool } from '../../config/db';
import { IPrintableRepository } from '../../domain/repositories/IPrintableRepository';
import { Printable } from '../../domain/entities/Printable';

// ✅ Ya está bien definido
export class MySQLPrintableRepository implements IPrintableRepository {
  async findByBroker(broker: string): Promise<Printable[]> {
    const [rows] = await pool.query(
      `SELECT 
        d.load_id,
        d.billing_date,
        d.bill_to AS customer,
        d.load_terminal AS broker,
        d.gross_profit AS gross_margin
      FROM data d
      WHERE d.billing_date BETWEEN '2024-01-01' AND '2024-12-31'
        AND d.load_terminal = ?`,
      [broker]
    );
    return rows as Printable[];
  }
}

// ✅ Agrega esta línea al final del archivo para exportar una instancia:
export const printableRepositoryMySQL = new MySQLPrintableRepository();

