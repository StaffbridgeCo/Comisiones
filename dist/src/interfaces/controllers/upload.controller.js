"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadExcelController = void 0;
const cargarDatosDesdeExcel_1 = require("../../domain/use-cases/cargarDatosDesdeExcel");
const data_repository_mysql_1 = require("../../infrastructure/repositories/data.repository.mysql");
const uploadExcelController = async (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }
    const repo = new data_repository_mysql_1.MySQLDataRepository();
    try {
        const insertedData = await (0, cargarDatosDesdeExcel_1.cargarDatosDesdeExcel)(file.buffer, repo);
        res.json(insertedData);
    }
    catch (error) {
        console.error("Error al procesar el Excel:", error);
        // Si el error tiene message, lo envías, si no, un mensaje genérico
        res.status(400).json({ message: error.message || "Error al procesar el archivo" });
    }
};
exports.uploadExcelController = uploadExcelController;
