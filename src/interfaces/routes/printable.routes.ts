// src/interfaces/routes/printable.routes.ts
import { Router } from 'express';
import { getPrintable } from '../controllers/printable.controller'; // <- Import con llaves

const router = Router();

router.get('/', getPrintable);

export default router;
