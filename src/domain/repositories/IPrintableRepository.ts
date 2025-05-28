// src/domain/repositories/IPrintableRepository.ts
import { Printable } from '../entities/Printable';

export interface IPrintableRepository {
  findByBroker(broker: string): Promise<Printable[]>;
}
