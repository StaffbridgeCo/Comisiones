"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redisClient_1 = require("./shared/redisClient");
const db_1 = require("./config/db");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./interfaces/routes");
const app = (0, express_1.default)();
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://scardons.github.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Documentación Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Middleware para manejar JSON
app.use(express_1.default.json());
// Configurar las rutas desde interfaces/routes.ts
(0, routes_1.setupRoutes)(app);
// Ruta para verificar conexión a MySQL
app.get('/', async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT 1+1 AS resultado');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error en la conexión BD' });
    }
});
// Ruta de prueba para Redis
app.get('/cache-test', async (req, res) => {
    try {
        await (0, redisClient_1.ensureRedisConnection)();
        await redisClient_1.redisClient.set('mensaje', 'Hola desde Redis');
        const valor = await redisClient_1.redisClient.get('mensaje');
        res.json({
            message: 'Prueba de Redis exitosa',
            valorGuardado: valor,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al conectar con Redis', error });
    }
});
exports.default = app;
