//src/domain/repositories/IDataRepository.ts
import { Data } from "../entities/Data";

export interface IDataRepository {
  insertMany(data: Data[]): Promise<void>;
  getAll(): Promise<Data[]>;

   // ✅ Nueva función para verificar si existen IDs
  findExistingLoadIds(loadIds: string[]): Promise<string[]>;
}
