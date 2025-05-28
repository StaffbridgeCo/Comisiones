"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrintable = void 0;
const getPrintableByBroker_1 = require("../../domain/use-cases/getPrintableByBroker");
const printable_repository_mysql_1 = require("../../infrastructure/repositories/printable.repository.mysql");
const getPrintable = async (req, res) => {
    const { broker } = req.query;
    if (!broker) {
        res.status(400).json({ error: 'Missing broker' });
        return;
    }
    try {
        const data = await (0, getPrintableByBroker_1.getPrintableByBroker)(broker, printable_repository_mysql_1.printableRepositoryMySQL);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching printable data' });
    }
};
exports.getPrintable = getPrintable;
