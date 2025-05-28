import { Router } from "express";
import { obtenerDatosController } from "../controllers/data.controller";

const router = Router();

router.get("/cargar-excel/datos", obtenerDatosController); // ← Ruta nueva

export default router;
