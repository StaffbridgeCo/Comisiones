"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const data_routes_1 = __importDefault(require("./routes/data.routes"));
const printable_routes_1 = __importDefault(require("./routes/printable.routes")); // ✅ nuevo import
const setupRoutes = (app) => {
    app.use('/usuarios', usuario_routes_1.default);
    app.use('/api', upload_routes_1.default);
    app.use('/', data_routes_1.default);
    app.use('/printable', printable_routes_1.default); // Entonces /printable?broker=XYZ
};
exports.setupRoutes = setupRoutes;
