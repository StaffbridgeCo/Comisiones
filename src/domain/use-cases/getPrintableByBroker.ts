// src/domain/use-cases/getPrintableByBroker.ts
//reglas de los brokers aca puedo poner mas reglas
import { IPrintableRepository } from '../repositories/IPrintableRepository';

const brokerRules: Record<
  string,
  {
    includeBrokers?: string[];
    excludeCustomers?: string[];
    includeConditionalBrokers?: {
      broker: string;
      filter: (entry: any) => boolean;
    }[];
  }
> = {
  Calume: {
    includeBrokers: ['Orqui'],
    excludeCustomers: ['24TONS'],
  },
  John: {
    includeConditionalBrokers: [
      {
        broker: 'Dave',
        filter: (entry) => entry.customer === 'OM Produce',
      },
    ],
  },
  'Jay M': {
    includeBrokers: ['Shaun'],
  },
};


export const getPrintableByBroker = async (
  broker: string,
  repo: IPrintableRepository,
  from?: string,
  to?: string
) => {
  const mainData = await repo.findByBroker(broker, from, to);
  const rules = brokerRules[broker];

  let extraData: any[] = [];

  // includeBrokers simples (sin filtro)
  if (rules?.includeBrokers?.length) {
    for (const extraBroker of rules.includeBrokers) {
      const data = await repo.findByBroker(extraBroker, from, to);
      extraData = extraData.concat(data);
    }
  }

  // includeConditionalBrokers con filtros personalizados
  if (rules?.includeConditionalBrokers?.length) {
    for (const { broker: conditionalBroker, filter } of rules.includeConditionalBrokers) {
      const data = await repo.findByBroker(conditionalBroker, from, to);
      const filtered = data.filter(filter);
      extraData = extraData.concat(filtered);
    }
  }

  let allData = [...mainData, ...extraData];

  // Filtro de customers excluidos
  if (rules?.excludeCustomers?.length) {
    allData = allData.filter(
      (entry) => !rules.excludeCustomers!.includes(entry.customer)
    );
  }

  return allData;
};
