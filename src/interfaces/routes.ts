// setupRoutes.ts
import { Express } from 'express';
import usuarioRoutes from './routes/usuario.routes';

export const setupRoutes = (app: Express) => {
  app.use('/usuarios', usuarioRoutes);
};
