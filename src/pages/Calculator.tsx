import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalculatorForm, type ProductInfo } from "@/components/calculator/CalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import type { CalculationResult } from "@/components/calculator/calculator-data";

export default function CalculatorPage() {
  const { toast } = useToast();
  
  const [productInfo, setProductInfo] = useState<ProductInfo>({
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
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
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

  const handleCategoryChange = (value: string) => {
    setProductInfo({
      ...productInfo,
      category: value,
    });
  };

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
    
    const selectedCategory = amazonCategories.find(
      (cat) => cat.id === productInfo.category
    );

    const referralFee = selectedCategory ? selectedCategory.referralFee : 0.13;
    
    const fbaReferralFee = sellPrice * referralFee;
    const fbaStorageFee = productInfo.fbaStorageFee ? Number(productInfo.fbaStorageFee) : 5.0;
    const fbaCost = cost + fbaReferralFee + fbaStorageFee;
    const fbaProfit = sellPrice - fbaCost;
    const fbaMargin = (fbaProfit / sellPrice) * 100;
    const fbaRoi = (fbaProfit / cost) * 100;

    const fbmReferralFee = sellPrice * referralFee;
    const fbmShippingCost = productInfo.fbmShippingCost ? Number(productInfo.fbmShippingCost) : 12.0;
    const fbmCost = cost + fbmReferralFee + fbmShippingCost;
    const fbmProfit = sellPrice - fbmCost;
    const fbmMargin = (fbmProfit / sellPrice) * 100;
    const fbmRoi = (fbmProfit / cost) * 100;

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
            <CalculatorForm
              productInfo={productInfo}
              onInputChange={handleInputChange}
              onCategoryChange={handleCategoryChange}
              onCalculate={calculateResults}
              onReset={resetForm}
              onSaveProfile={saveProfile}
            />
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Resultados da Calculadora</CardTitle>
              </CardHeader>
              <CardContent>
                <CalculatorResults result={result} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
