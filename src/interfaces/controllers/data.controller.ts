import { Request, Response } from "express";
import { obtenerDatos } from "../../domain/use-cases/obtenerDatos";
import { MySQLDataRepository } from "../../infrastructure/repositories/data.repository.mysql";

const dataRepo = new MySQLDataRepository();

export const obtenerDatosController = async (req: Request, res: Response) => {
  try {
    const getAll = obtenerDatos(dataRepo);
    const data = await getAll();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};
