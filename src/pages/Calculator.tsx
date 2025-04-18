
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Check, Info, RefreshCw, Save } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Categorias da Amazon
const amazonCategories = [
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
];

type CalculationResult = {
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

export default function CalculatorPage() {
  const { toast } = useToast();
  
  // Estado para o formulário
  const [productInfo, setProductInfo] = useState({
    asin: "",
    name: "",
    category: "electronics",
    sellPrice: "" as string | number,
    cost: "" as string | number,
    weight: "" as string | number,
    length: "" as string | number,
    width: "" as string | number,
    height: "" as string | number,
    fbaStorageFee: "" as string | number,
    fbmShippingCost: "" as string | number,
  });
  
  // Estado para os resultados do cálculo
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Manipular mudanças nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validar entradas numéricas
    if (
      ["sellPrice", "cost", "weight", "length", "width", "height", "fbaStorageFee", "fbmShippingCost"].includes(name) &&
      value !== ""
    ) {
      const numValue = parseFloat(value.replace(",", "."));
      if (isNaN(numValue)) return;
      
      setProductInfo({
        ...productInfo,
        [name]: numValue,
      });
    } else {
      setProductInfo({
        ...productInfo,
        [name]: value,
      });
    }
  };

  // Manipular mudança de categoria
  const handleCategoryChange = (value: string) => {
    setProductInfo({
      ...productInfo,
      category: value,
    });
  };

  // Calcular resultados para FBA e FBM
  const calculateResults = () => {
    if (
      productInfo.sellPrice === "" ||
      productInfo.cost === ""
    ) {
      toast({
        title: "Dados insuficientes",
        description: "Preencha pelo menos o preço de venda e o custo do produto.",
        variant: "destructive",
      });
      return;
    }

    const sellPrice = Number(productInfo.sellPrice);
    const cost = Number(productInfo.cost);
    
    // Encontrar a categoria selecionada
    const selectedCategory = amazonCategories.find(
      (cat) => cat.id === productInfo.category
    );

    // Calcular taxas com base na categoria
    const referralFee = selectedCategory ? selectedCategory.referralFee : 0.13;
    
    // Calcular para FBA
    const fbaReferralFee = sellPrice * referralFee;
    const fbaStorageFee = productInfo.fbaStorageFee ? Number(productInfo.fbaStorageFee) : 5.0;
    const fbaCost = cost + fbaReferralFee + fbaStorageFee;
    const fbaProfit = sellPrice - fbaCost;
    const fbaMargin = (fbaProfit / sellPrice) * 100;
    const fbaRoi = (fbaProfit / cost) * 100;

    // Calcular para FBM
    const fbmReferralFee = sellPrice * referralFee;
    const fbmShippingCost = productInfo.fbmShippingCost ? Number(productInfo.fbmShippingCost) : 12.0;
    const fbmCost = cost + fbmReferralFee + fbmShippingCost;
    const fbmProfit = sellPrice - fbmCost;
    const fbmMargin = (fbmProfit / sellPrice) * 100;
    const fbmRoi = (fbmProfit / cost) * 100;

    // Definir os resultados
    setResult({
      fbaSellPrice: sellPrice,
      fbmSellPrice: sellPrice,
      fbaReferralFee,
      fbmReferralFee,
      fbaCost,
      fbmCost,
      fbaProfit,
      fbmProfit,
      fbaMargin,
      fbmMargin,
      fbaRoi,
      fbmRoi,
    });

    toast({
      title: "Cálculo realizado",
      description: "Os resultados foram atualizados com sucesso!",
    });
  };

  // Resetar o formulário
  const resetForm = () => {
    setProductInfo({
      asin: "",
      name: "",
      category: "electronics",
      sellPrice: "",
      cost: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      fbaStorageFee: "",
      fbmShippingCost: "",
    });
    setResult(null);
    
    toast({
      title: "Formulário resetado",
      description: "Todos os campos foram limpos.",
    });
  };

  // Salvar como perfil (funcionalidade futura)
  const saveProfile = () => {
    toast({
      title: "Funcionalidade em breve!",
      description: "Salvamento de perfis estará disponível no plano Pro.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <SectionHeader
          title="Calculadora FBA vs FBM"
          description="Compare custos, margens e lucros entre os modelos logísticos da Amazon."
          action={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetForm}>
                <RefreshCw size={14} className="mr-1" /> Resetar
              </Button>
              <Button variant="outline" size="sm" onClick={saveProfile}>
                <Save size={14} className="mr-1" /> Salvar Perfil
              </Button>
            </div>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <Calculator size={18} className="mr-2" />
                  Informações do Produto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asin">ASIN (opcional)</Label>
                  <Input
                    id="asin"
                    name="asin"
                    placeholder="Ex: B09ABCDEF1"
                    value={productInfo.asin}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto (opcional)</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ex: Fone de Ouvido Bluetooth"
                    value={productInfo.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={productInfo.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {amazonCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    A categoria afeta as taxas de referência da Amazon.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellPrice">
                    Preço de Venda (R$) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="sellPrice"
                    name="sellPrice"
                    placeholder="Ex: 99,90"
                    value={productInfo.sellPrice}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">
                    Custo do Produto (R$) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cost"
                    name="cost"
                    placeholder="Ex: 45,00"
                    value={productInfo.cost}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2 flex items-center">
                    <Info size={14} className="mr-1 text-muted-foreground" />
                    Informações Adicionais (opcionais)
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        placeholder="Ex: 0,3"
                        value={productInfo.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Altura (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        placeholder="Ex: 15"
                        value={productInfo.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Largura (cm)</Label>
                      <Input
                        id="width"
                        name="width"
                        placeholder="Ex: 10"
                        value={productInfo.width}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Comprimento (cm)</Label>
                      <Input
                        id="length"
                        name="length"
                        placeholder="Ex: 20"
                        value={productInfo.length}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="space-y-2">
                      <Label htmlFor="fbaStorageFee">Taxa FBA (R$)</Label>
                      <Input
                        id="fbaStorageFee"
                        name="fbaStorageFee"
                        placeholder="Ex: 5,00"
                        value={productInfo.fbaStorageFee}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fbmShippingCost">Envio FBM (R$)</Label>
                      <Input
                        id="fbmShippingCost"
                        name="fbmShippingCost"
                        placeholder="Ex: 12,00"
                        value={productInfo.fbmShippingCost}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" onClick={calculateResults}>
                  Calcular Resultados
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Resultados da Calculadora</CardTitle>
              </CardHeader>
              <CardContent>
                {!result ? (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <Calculator size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum cálculo realizado</h3>
                    <p className="text-muted-foreground max-w-md">
                      Preencha as informações do produto no formulário ao lado e clique em "Calcular Resultados" para visualizar a comparação entre FBA e FBM.
                    </p>
                  </div>
                ) : (
                  <Tabs defaultValue="comparison">
                    <TabsList className="mb-6">
                      <TabsTrigger value="comparison">Comparação</TabsTrigger>
                      <TabsTrigger value="details">Detalhes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="comparison" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-l-4 border-l-amazon-primary">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium">
                              Fulfillment by Amazon (FBA)
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                                <p className={`text-2xl font-bold ${result.fbaProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                                  R$ {result.fbaProfit.toFixed(2)}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Margem</p>
                                  <p className={`text-lg font-semibold ${result.fbaMargin >= 20 ? 'text-success' : result.fbaMargin >= 10 ? 'text-warning' : 'text-destructive'}`}>
                                    {result.fbaMargin.toFixed(2)}%
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">ROI</p>
                                  <p className={`text-lg font-semibold ${result.fbaRoi >= 30 ? 'text-success' : result.fbaRoi >= 15 ? 'text-warning' : 'text-destructive'}`}>
                                    {result.fbaRoi.toFixed(2)}%
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-sm pt-2 border-t">
                                <div className="flex justify-between py-1">
                                  <span className="text-muted-foreground">Preço de Venda:</span>
                                  <span>R$ {result.fbaSellPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-muted-foreground">Custo Total:</span>
                                  <span>R$ {result.fbaCost.toFixed(2)}</span>
                                </div>
                              </div>
                              
                              {/* Vantagens do FBA */}
                              <div className="pt-2 border-t">
                                <p className="text-sm font-medium mb-2">Vantagens do FBA:</p>
                                <ul className="text-xs space-y-1">
                                  <li className="flex items-start gap-2">
                                    <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>Maior chance de ganhar a BuyBox</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>Amazon gerencia estoque e envios</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>Elegível para Amazon Prime</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-l-4 border-l-muted">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium">
                              Fulfillment by Merchant (FBM)
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                                <p className={`text-2xl font-bold ${result.fbmProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                                  R$ {result.fbmProfit.toFixed(2)}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Margem</p>
                                  <p className={`text-lg font-semibold ${result.fbmMargin >= 20 ? 'text-success' : result.fbmMargin >= 10 ? 'text-warning' : 'text-destructive'}`}>
                                    {result.fbmMargin.toFixed(2)}%
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">ROI</p>
                                  <p className={`text-lg font-semibold ${result.fbmRoi >= 30 ? 'text-success' : result.fbmRoi >= 15 ? 'text-warning' : 'text-destructive'}`}>
                                    {result.fbmRoi.toFixed(2)}%
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-sm pt-2 border-t">
                                <div className="flex justify-between py-1">
                                  <span className="text-muted-foreground">Preço de Venda:</span>
                                  <span>R$ {result.fbmSellPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-muted-foreground">Custo Total:</span>
                                  <span>R$ {result.fbmCost.toFixed(2)}</span>
                                </div>
                              </div>
                              
                              {/* Vantagens do FBM */}
                              <div className="pt-2 border-t">
                                <p className="text-sm font-medium mb-2">Vantagens do FBM:</p>
                                <ul className="text-xs space-y-1">
                                  <li className="flex items-start gap-2">
                                    <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>Maior controle sobre a operação</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>Sem taxas de armazenamento FBA</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>Melhor para produtos de baixo giro</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <Info size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                              <p className="font-medium">Recomendação:</p>
                              <p className="text-muted-foreground">
                                {result.fbaProfit > result.fbmProfit
                                  ? `O modelo FBA parece mais lucrativo (R$ ${(result.fbaProfit - result.fbmProfit).toFixed(2)} a mais de lucro), especialmente se você valoriza automatização e maior chance de BuyBox.`
                                  : `O modelo FBM parece mais lucrativo (R$ ${(result.fbmProfit - result.fbaProfit).toFixed(2)} a mais de lucro), especialmente se você tem estrutura para gerenciar envios.`}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="details">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Detalhes FBA</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Preço de Venda</span>
                                <span>R$ {result.fbaSellPrice.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Custo do Produto</span>
                                <span>R$ {Number(productInfo.cost).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Taxa de Referência</span>
                                <span>R$ {result.fbaReferralFee.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Taxa FBA</span>
                                <span>R$ {(productInfo.fbaStorageFee ? Number(productInfo.fbaStorageFee) : 5.0).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm border-t pt-2">
                                <span className="font-medium">Custo Total</span>
                                <span className="font-medium">R$ {result.fbaCost.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm border-t pt-2">
                                <span className="font-medium">Lucro Líquido</span>
                                <span className={`font-medium ${result.fbaProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                                  R$ {result.fbaProfit.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Margem</span>
                                <span className={`font-medium ${result.fbaMargin >= 20 ? 'text-success' : result.fbaMargin >= 10 ? 'text-warning' : 'text-destructive'}`}>
                                  {result.fbaMargin.toFixed(2)}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">ROI</span>
                                <span className={`font-medium ${result.fbaRoi >= 30 ? 'text-success' : result.fbaRoi >= 15 ? 'text-warning' : 'text-destructive'}`}>
                                  {result.fbaRoi.toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Detalhes FBM</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Preço de Venda</span>
                                <span>R$ {result.fbmSellPrice.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Custo do Produto</span>
                                <span>R$ {Number(productInfo.cost).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Taxa de Referência</span>
                                <span>R$ {result.fbmReferralFee.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Custo de Envio</span>
                                <span>R$ {(productInfo.fbmShippingCost ? Number(productInfo.fbmShippingCost) : 12.0).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm border-t pt-2">
                                <span className="font-medium">Custo Total</span>
                                <span className="font-medium">R$ {result.fbmCost.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm border-t pt-2">
                                <span className="font-medium">Lucro Líquido</span>
                                <span className={`font-medium ${result.fbmProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                                  R$ {result.fbmProfit.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Margem</span>
                                <span className={`font-medium ${result.fbmMargin >= 20 ? 'text-success' : result.fbmMargin >= 10 ? 'text-warning' : 'text-destructive'}`}>
                                  {result.fbmMargin.toFixed(2)}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">ROI</span>
                                <span className={`font-medium ${result.fbmRoi >= 30 ? 'text-success' : result.fbmRoi >= 15 ? 'text-warning' : 'text-destructive'}`}>
                                  {result.fbmRoi.toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
