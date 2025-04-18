
export const amazonCategories = [
  { id: "electronics", name: "Eletrônicos", fbaFee: 0.15, referralFee: 0.08 },
  { id: "home", name: "Casa e Cozinha", fbaFee: 0.15, referralFee: 0.12 },
  { id: "toys", name: "Brinquedos", fbaFee: 0.15, referralFee: 0.10 },
  { id: "beauty", name: "Beleza", fbaFee: 0.15, referralFee: 0.11 },
  { id: "books", name: "Livros", fbaFee: 0.15, referralFee: 0.15 },
  { id: "clothing", name: "Roupas", fbaFee: 0.15, referralFee: 0.14 },
  { id: "sports", name: "Esportes", fbaFee: 0.15, referralFee: 0.12 },
  { id: "kitchen", name: "Cozinha", fbaFee: 0.15, referralFee: 0.11 },
  { id: "tools", name: "Ferramentas", fbaFee: 0.15, referralFee: 0.10 },
  { id: "other", name: "Outros", fbaFee: 0.15, referralFee: 0.13 },
] as const;

export type CalculationResult = {
  fbaSellPrice: number;
  fbmSellPrice: number;
  fbaReferralFee: number;
  fbmReferralFee: number;
  fbaCost: number;
  fbmCost: number;
  fbaProfit: number;
  fbmProfit: number;
  fbaMargin: number;
  fbmMargin: number;
  fbaRoi: number;
  fbmRoi: number;
};
