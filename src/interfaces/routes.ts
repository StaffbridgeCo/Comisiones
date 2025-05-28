import { Express } from 'express';
import usuarioRoutes from './routes/usuario.routes';
import uploadRoutes from './routes/upload.routes';
import dataRoutes from './routes/data.routes';
import printableRoutes from './routes/printable.routes'; // ✅ nuevo import

export const setupRoutes = (app: Express) => {
  app.use('/usuarios', usuarioRoutes);
  app.use('/api', uploadRoutes);
  app.use('/', dataRoutes);
  app.use('/printable', printableRoutes); // Entonces /printable?broker=XYZ
};
