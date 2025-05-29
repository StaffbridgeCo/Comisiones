// src/domain/use-cases/getPrintableByBroker.ts
import { IPrintableRepository } from '../repositories/IPrintableRepository';

export const getPrintableByBroker = async (
  broker: string,
  repo: IPrintableRepository,
  from?: string,
  to?: string
) => {
  return await repo.findByBroker(broker, from, to);
};
