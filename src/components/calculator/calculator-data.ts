
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
  // Adicionar todas as categorias da tabela fornecida
  { id: "amazon_devices", name: "Acessórios para Dispositivos Amazon", fbaFee: 0.15, referralFee: 0.45 },
  { id: "compact_appliances", name: "Eletrodomésticos - Compactos", fbaFee: 0.15, referralFee: 0.15 },
  { id: "large_appliances", name: "Eletrodomésticos - Grandes", fbaFee: 0.15, referralFee: 0.08 },
  { id: "automotive", name: "Automotivo e Esportes Motorizados", fbaFee: 0.15, referralFee: 0.12 },
  { id: "power_tools", name: "Ferramentas Elétricas de Base", fbaFee: 0.15, referralFee: 0.12 },
  { id: "baby", name: "Produtos para Bebês", fbaFee: 0.15, referralFee: 0.15 },
  { id: "bags", name: "Mochilas, Bolsas e Bagagens", fbaFee: 0.15, referralFee: 0.15 },
  { id: "health_beauty", name: "Beleza, Saúde e Cuidados Pessoais", fbaFee: 0.15, referralFee: 0.15 },
  { id: "industrial", name: "Suprimentos Comerciais, Industriais e Científicos", fbaFee: 0.15, referralFee: 0.12 },
  { id: "computers", name: "Computadores", fbaFee: 0.15, referralFee: 0.08 },
  { id: "consumer_electronics", name: "Eletrônicos de Consumo", fbaFee: 0.15, referralFee: 0.08 },
  { id: "electronic_accessories", name: "Acessórios de Eletrônicos", fbaFee: 0.15, referralFee: 0.15 },
  { id: "eyewear", name: "Óculos", fbaFee: 0.15, referralFee: 0.15 },
  { id: "fine_art", name: "Arte Fina", fbaFee: 0.15, referralFee: 0.20 },
  { id: "shoes", name: "Calçados", fbaFee: 0.15, referralFee: 0.15 },
  { id: "furniture", name: "Móveis", fbaFee: 0.15, referralFee: 0.15 },
  { id: "gift_cards", name: "Cartões Presente", fbaFee: 0.15, referralFee: 0.20 },
  { id: "gourmet_food", name: "Alimentos e Bebidas Gourmet", fbaFee: 0.15, referralFee: 0.15 },
  { id: "jewelry", name: "Joias", fbaFee: 0.15, referralFee: 0.20 },
  { id: "lawn_garden", name: "Jardim e Exteriores", fbaFee: 0.15, referralFee: 0.15 },
  { id: "lawn_tools", name: "Cortadores de Grama e Sopradores de Neve", fbaFee: 0.15, referralFee: 0.15 },
  { id: "mattresses", name: "Colchões", fbaFee: 0.15, referralFee: 0.15 },
  { id: "media", name: "Mídia - Livros, DVDs, Música, Software", fbaFee: 0.15, referralFee: 0.15 },
  { id: "musical_instruments", name: "Instrumentos Musicais e Produção AV", fbaFee: 0.15, referralFee: 0.15 },
  { id: "office_products", name: "Produtos de Escritório", fbaFee: 0.15, referralFee: 0.15 },
  { id: "pet_products", name: "Produtos para Animais de Estimação", fbaFee: 0.15, referralFee: 0.15 },
  { id: "tires", name: "Pneus", fbaFee: 0.15, referralFee: 0.10 },
  { id: "tools_home", name: "Ferramentas e Melhoria do Lar", fbaFee: 0.15, referralFee: 0.15 },
  { id: "video_games", name: "Videogames e Acessórios", fbaFee: 0.15, referralFee: 0.15 },
  { id: "video_consoles", name: "Consoles de Videogame", fbaFee: 0.15, referralFee: 0.08 },
  { id: "watches", name: "Relógios", fbaFee: 0.15, referralFee: 0.16 },
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
  };
};
