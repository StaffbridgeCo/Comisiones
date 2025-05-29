import { RequestHandler } from 'express';
import { getPrintableByBroker } from '../../domain/use-cases/getPrintableByBroker';
import { printableRepositoryMySQL } from '../../infrastructure/repositories/printable.repository.mysql';

export const getPrintable: RequestHandler = async (req, res): Promise<void> => {
  const { broker, from, to } = req.query;

  if (!broker) {
    res.status(400).json({ error: 'Missing broker' });
    return;
  }

  try {
    const data = await getPrintableByBroker(
      broker as string,
      printableRepositoryMySQL,
      from as string,
      to as string
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching printable data' });
  }
};
