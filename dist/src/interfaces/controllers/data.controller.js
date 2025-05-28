"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerDatosController = void 0;
const obtenerDatos_1 = require("../../domain/use-cases/obtenerDatos");
const data_repository_mysql_1 = require("../../infrastructure/repositories/data.repository.mysql");
const dataRepo = new data_repository_mysql_1.MySQLDataRepository();
const obtenerDatosController = async (req, res) => {
    try {
        const getAll = (0, obtenerDatos_1.obtenerDatos)(dataRepo);
        const data = await getAll();
        res.json(data);
    }
    catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
};
exports.obtenerDatosController = obtenerDatosController;
