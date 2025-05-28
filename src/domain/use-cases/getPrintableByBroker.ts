// src/domain/use-cases/getPrintableByBroker.ts
import { IPrintableRepository } from '../repositories/IPrintableRepository';

export const getPrintableByBroker = async (broker: string, repo: IPrintableRepository) => {
  return await repo.findByBroker(broker);
};
