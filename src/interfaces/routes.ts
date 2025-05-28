//src/interfaces/routes.ts
import { Express } from 'express';
import usuarioRoutes from './routes/usuario.routes';
import uploadRoutes from './../interfaces/routes/upload.routes'
import dataRoutes from "./routes/data.routes";


export const setupRoutes = (app: Express) => {
  app.use('/usuarios', usuarioRoutes);
  app.use("/api", uploadRoutes);
  app.use("/", dataRoutes);
};
