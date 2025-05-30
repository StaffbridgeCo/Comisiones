// src/domain/use-cases/getPrintableByBroker.ts
//reglas de los brokers
import { IPrintableRepository } from '../repositories/IPrintableRepository';

const brokerRules: Record<string, { includeBrokers: string[]; excludeCustomers: string[] }> = {
  Calume: {
    includeBrokers: ['Orqui'],
    excludeCustomers: ['24TONS'],
  },
  // Aquí puedes agregar más reglas si otros brokers necesitan lógica especial
};

export const getPrintableByBroker = async (
  broker: string,
  repo: IPrintableRepository,
  from?: string,
  to?: string
) => {
  // Buscar datos del broker principal
  const mainData = await repo.findByBroker(broker, from, to);

  // Ver si hay reglas para el broker
  const rules = brokerRules[broker];

  let extraData: any[] = [];

  // Si el broker tiene brokers adicionales para incluir, los buscamos
  if (rules?.includeBrokers?.length) {
    for (const extraBroker of rules.includeBrokers) {
      const data = await repo.findByBroker(extraBroker, from, to);
      extraData = extraData.concat(data);
    }
  }

  // Unimos todos los datos
  let allData = [...mainData, ...extraData];

  // Si hay customers a excluir, los filtramos
  if (rules?.excludeCustomers?.length) {
    allData = allData.filter(
      (entry) => !rules.excludeCustomers.includes(entry.customer)
    );
  }

  return allData;
};
