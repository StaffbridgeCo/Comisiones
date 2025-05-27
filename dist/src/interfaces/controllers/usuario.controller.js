"use strict";
//src/interface/controllers/usuario.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.perfil = perfil;
const loginUsuario_1 = require("../../domain/use-cases/loginUsuario");
const usuario_repository_mysql_1 = require("../../infrastructure/repositories/usuario.repository.mysql");
const usuarioRepository = new usuario_repository_mysql_1.UsuarioRepository();
const loginUsuarioUseCase = new loginUsuario_1.LoginUsuario(usuarioRepository);
// controlador del login
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        return;
    }
    try {
        const token = await loginUsuarioUseCase.execute(email, password);
        res.status(200).json({ message: 'Login exitoso', token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// controlador del perfil
async function perfil(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'No autorizado' });
            return;
        }
        res.json({
            message: 'Perfil del usuario',
            usuario: req.user,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
}
