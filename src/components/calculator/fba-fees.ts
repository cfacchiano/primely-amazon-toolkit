
// Tarifas de armazenamento por m³ por mês
export const storageFeePerCubicMeter = 28.63; // R$ por m³ por mês

// Tarifas de logística FBA baseadas no peso
export const getFbaLogisticsFee = (weightInKg: number): number => {
  if (weightInKg <= 0.1) return 4.14;  // até 100g
  if (weightInKg <= 0.25) return 4.79; // até 250g
  if (weightInKg <= 0.5) return 7.43;  // até 500g
  if (weightInKg <= 0.75) return 8.22; // até 750g
  if (weightInKg <= 1) return 11.19;   // até 1kg
  if (weightInKg <= 1.5) return 12.74; // até 1.5kg
  if (weightInKg <= 2) return 13.99;   // até 2kg
  if (weightInKg <= 3) return 15.66;   // até 3kg
  if (weightInKg <= 4) return 17.45;   // até 4kg
  if (weightInKg <= 5) return 19.99;   // até 5kg
  if (weightInKg <= 7) return 27.29;   // até 7kg
  if (weightInKg <= 10) return 31.99;  // até 10kg
  if (weightInKg <= 15) return 38.99;  // até 15kg
  if (weightInKg <= 20) return 44.99;  // até 20kg
  if (weightInKg <= 25) return 59.99;  // até 25kg
  if (weightInKg <= 30) return 73.99;  // até 30kg
  return 73.99 + Math.ceil((weightInKg - 30) / 10) * 25.00; // +R$25 a cada 10kg adicionais
};
