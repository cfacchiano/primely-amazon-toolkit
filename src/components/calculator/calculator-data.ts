
export const amazonCategories = [
  { id: "amazon_devices", name: "Acessórios para Dispositivos Amazon", referralFee: 0.45 },
  { id: "compact_appliances", name: "Eletrodomésticos - Compactos", referralFee: 0.15 },
  { id: "large_appliances", name: "Eletrodomésticos - Grandes", referralFee: 0.08 },
  { id: "automotive", name: "Automotivo e Esportes Motorizados", referralFee: 0.12 },
  { id: "power_tools", name: "Ferramentas Elétricas de Base", referralFee: 0.12 },
  { id: "baby", name: "Produtos para Bebês", referralFee: 0.15 },
  { id: "bags", name: "Mochilas, Bolsas e Bagagens", referralFee: 0.15 },
  { id: "health_beauty", name: "Beleza, Saúde e Cuidados Pessoais", referralFee: 0.15 },
  { id: "industrial", name: "Suprimentos Comerciais, Industriais e Científicos", referralFee: 0.12 },
  { id: "computers", name: "Computadores", referralFee: 0.08 },
  { id: "consumer_electronics", name: "Eletrônicos de Consumo", referralFee: 0.08 },
  { id: "electronic_accessories", name: "Acessórios de Eletrônicos", referralFee: 0.15 },
  { id: "eyewear", name: "Óculos", referralFee: 0.15 },
  { id: "fine_art", name: "Arte Fina", referralFee: 0.20 },
  { id: "shoes", name: "Calçados", referralFee: 0.15 },
  { id: "furniture", name: "Móveis", referralFee: 0.15 },
  { id: "gift_cards", name: "Cartões Presente", referralFee: 0.20 },
  { id: "gourmet_food", name: "Alimentos e Bebidas Gourmet", referralFee: 0.15 },
  { id: "home", name: "Casa e Cozinha", referralFee: 0.15 },
  { id: "jewelry", name: "Joias", referralFee: 0.20 },
  { id: "garden", name: "Jardim e Exteriores", referralFee: 0.15 },
  { id: "lawn_tools", name: "Cortadores de Grama e Sopradores de Neve", referralFee: 0.15 },
  { id: "mattresses", name: "Colchões", referralFee: 0.15 },
  { id: "media", name: "Mídia - Livros, DVDs, Música, Software", referralFee: 0.15 },
  { id: "musical_instruments", name: "Instrumentos Musicais e Produção AV", referralFee: 0.15 },
  { id: "office_products", name: "Produtos de Escritório", referralFee: 0.15 },
  { id: "pet_products", name: "Produtos para Animais de Estimação", referralFee: 0.15 },
  { id: "tires", name: "Pneus", referralFee: 0.10 },
  { id: "tools", name: "Ferramentas e Melhoria do Lar", referralFee: 0.15 },
  { id: "toys", name: "Brinquedos e Jogos", referralFee: 0.15 },
  { id: "video_games", name: "Videogames e Acessórios", referralFee: 0.15 },
  { id: "video_consoles", name: "Consoles de Videogame", referralFee: 0.08 },
  { id: "watches", name: "Relógios", referralFee: 0.16 },
  { id: "other", name: "Outros", referralFee: 0.15 }
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
  productDimensions?: {
    length: number;
    width: number;
    height: number;
    volumeInCubicMeters: number;
    weightInKg: number;
  };
};
