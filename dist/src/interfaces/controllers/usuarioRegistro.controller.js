"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrar = registrar;
const registrarUsuario_1 = require("../../domain/use-cases/registrarUsuario");
const usuario_repository_mysql_1 = require("../../infrastructure/repositories/usuario.repository.mysql");
const usuarioRepository = new usuario_repository_mysql_1.UsuarioRepository();
const registrarUsuarioUseCase = new registrarUsuario_1.RegistrarUsuario(usuarioRepository);
async function registrar(req, res) {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }
    try {
        await registrarUsuarioUseCase.execute(nombre, email, password);
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
}
