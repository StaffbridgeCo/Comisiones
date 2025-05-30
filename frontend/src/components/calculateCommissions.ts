// calculateCommissions.ts

export interface Printable {
  load_id: string;
  billing_date: string;
  customer: string;
  broker: string;
  gross_margin: string;
  commissions?: string;
}

export function calculateCommissionData(
  data: Printable[],
  percentages: { [key: string]: string }
) {
  const adjustments = data
    .filter(d => parseFloat(d.gross_margin) <= 0)
    .map(d => {
      const gross = parseFloat(d.gross_margin || '0');
      const percent = parseFloat(percentages[d.load_id] ?? '0');
      const commission = !isNaN(percent) && !isNaN(gross)
        ? (gross * (percent / 100)).toFixed(2)
        : '0.00';

      return {
        ...d,
        description: gross < 0 ? 'Negative margin' : 'Load with no profit',
        calculatedCommission: commission,
      };
    });

  const mainTableData = data.filter(d => parseFloat(d.gross_margin) > 0);

  const totalGrossMargin = mainTableData.reduce(
    (acc, d) => acc + parseFloat(d.gross_margin || '0'), 0
  );

  const totalCommissions = mainTableData.reduce((acc, d) => {
    const percent = parseFloat(percentages[d.load_id] ?? '0');
    const gross = parseFloat(d.gross_margin || '0');
    return !isNaN(percent) && !isNaN(gross) ? acc + gross * (percent / 100) : acc;
  }, 0);

  const totalAdjustmentCount = adjustments.length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalAdjustmentCommissions = adjustments.reduce((acc, adj: any) => {
    const percentage = parseFloat(percentages[adj.load_id] ?? '0');
    const gross = parseFloat(adj.gross_margin);
    return !isNaN(percentage) && !isNaN(gross) ? acc + gross * (percentage / 100) : acc;
  }, 0);

  const totalGeneral = totalCommissions + totalAdjustmentCommissions;

  return {
    adjustments,
    mainTableData,
    totalGrossMargin,
    totalCommissions,
    totalAdjustmentCount,
    totalAdjustmentCommissions,
    totalGeneral,
  };
}
