
// Tarifas de armazenamento por m³ por mês
export const storageFeePerCubicMeter = 28.63; // R$ por m³ por mês

// Tarifas de logística FBA baseadas no peso
export const getFbaLogisticsFee = (weightInKg: number): number => {
  if (weightInKg <= 0.5) return 7.43;
  if (weightInKg <= 1) return 11.19;
  if (weightInKg <= 2) return 13.99;
  if (weightInKg <= 5) return 19.99;
  if (weightInKg <= 10) return 31.99;
  if (weightInKg <= 20) return 44.99;
  if (weightInKg <= 30) return 73.99;
  return 73.99 + Math.ceil((weightInKg - 30) / 10) * 25.00; // +R$25 a cada 10kg adicionais
};
