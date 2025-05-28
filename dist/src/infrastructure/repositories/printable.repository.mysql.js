"use strict";
// src/infrastructure/repositories/printable.repository.mysql.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.printableRepositoryMySQL = exports.MySQLPrintableRepository = void 0;
const db_1 = require("../../config/db");
// ✅ Ya está bien definido
class MySQLPrintableRepository {
    async findByBroker(broker) {
        const [rows] = await db_1.pool.query(`SELECT 
        d.load_id,
        d.billing_date,
        d.bill_to AS customer,
        d.load_terminal AS broker,
        d.gross_profit AS gross_margin
      FROM data d
      WHERE d.billing_date BETWEEN '2024-01-01' AND '2024-12-31'
        AND d.load_terminal = ?`, [broker]);
        return rows;
    }
}
exports.MySQLPrintableRepository = MySQLPrintableRepository;
// ✅ Agrega esta línea al final del archivo para exportar una instancia:
exports.printableRepositoryMySQL = new MySQLPrintableRepository();
