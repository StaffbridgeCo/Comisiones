//src/interfaces/controllers/upload.controller.ts
import { Request, Response } from "express";
import { cargarDatosDesdeExcel } from "../../domain/use-cases/cargarDatosDesdeExcel";
import { MySQLDataRepository } from "../../infrastructure/repositories/data.repository.mysql";

export const uploadExcelController = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

    const repo = new MySQLDataRepository();

try {
  const insertedData = await cargarDatosDesdeExcel(file.buffer, repo);
  res.json(insertedData);
} catch (error: any) {
  console.error("Error al procesar el Excel:", error);
  // Si el error tiene message, lo envías, si no, un mensaje genérico
  res.status(400).json({ message: error.message || "Error al procesar el archivo" });
}

};