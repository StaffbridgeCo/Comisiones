//src/interfaces/routes/upload.routes.ts
import { Router } from "express";
import multer from "multer";
import { uploadExcelController } from "../controllers/upload.controller";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadExcelController);

export default router;
