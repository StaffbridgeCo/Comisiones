// src/domain/repositories/IPrintableRepository.ts
import { Printable } from '../entities/Printable';

export interface IPrintableRepository {
  findByBroker(broker: string, from?: string, to?: string): Promise<Printable[]>;
}
