
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalculatorForm, type ProductInfo } from "@/components/calculator/CalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import { useCalculator } from "@/hooks/useCalculator";

export default function CalculatorPage() {
  const { toast } = useToast();
  const { result, calculateResults, setResult } = useCalculator();
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (
      ["sellPrice", "cost", "weight", "length", "width", "height", "fbaStorageFee", "fbmShippingCost"].includes(name) &&
      value !== ""
    ) {
      // Replace comma with dot for decimal values
      const normalizedValue = value.replace(",", ".");
      const numValue = parseFloat(normalizedValue);
      
      if (!isNaN(numValue)) {
        setProductInfo({
          ...productInfo,
          [name]: value, // Keep the original value with comma for display
        });
      }
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
              onCalculate={() => calculateResults(productInfo)}
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
                <CalculatorResults result={result} productInfo={productInfo} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
