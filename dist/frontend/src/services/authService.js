"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerPerfil = exports.loginUsuario = exports.registrarUsuario = void 0;
const axios_1 = __importDefault(require("axios"));
// Función para registrar un nuevo usuario
const registrarUsuario = async (data) => {
    const response = await axios_1.default.post('http://localhost:3000/usuarios/registrar', data);
    return response.data; // Si la solicitud es exitosa, se retorna la respuesta
};
exports.registrarUsuario = registrarUsuario;
// Función para hacer login y obtener el token
const loginUsuario = async (data) => {
    try {
        const response = await axios_1.default.post('http://localhost:3000/usuarios/login', data);
        return response.data;
    }
    catch (error) {
        const mensaje = error?.response?.data?.message || 'Error al iniciar sesión';
        throw new Error(mensaje);
    }
};
exports.loginUsuario = loginUsuario;
// Función para obtener el perfil del usuario
const obtenerPerfil = async (token) => {
    const res = await axios_1.default.get('/perfil', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
exports.obtenerPerfil = obtenerPerfil;
