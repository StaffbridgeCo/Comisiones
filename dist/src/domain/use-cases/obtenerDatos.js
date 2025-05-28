"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerDatos = void 0;
const obtenerDatos = (dataRepo) => {
    return async () => {
        return await dataRepo.getAll();
    };
};
exports.obtenerDatos = obtenerDatos;
