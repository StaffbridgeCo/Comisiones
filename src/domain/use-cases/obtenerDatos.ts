import { IDataRepository } from "../repositories/IDataRepository";

export const obtenerDatos = (dataRepo: IDataRepository) => {
  return async () => {
    return await dataRepo.getAll();
  };
};
