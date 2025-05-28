//src/domain/repositories/IDataRepository.ts
import { Data } from "../entities/Data";

export interface IDataRepository {
  insertMany(data: Data[]): Promise<void>;
}
