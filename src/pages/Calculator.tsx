
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    otherCosts: "",
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
      ["sellPrice", "cost", "weight", "length", "width", "height", "fbaStorageFee", "fbmShippingCost"].includes(name)
    ) {
      // Accept decimal input in Brazilian format (using comma)
      // Allow input like "0,01" or "15,54"
      const validFormat = /^$|^\d*$|^\d*,\d*$/.test(value);
      
      if (validFormat) {
        setProductInfo({
          ...productInfo,
          [name]: value,
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
      otherCosts: "",
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
            <Tabs defaultValue="fba" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fba">FBA - Logística da Amazon</TabsTrigger>
                <TabsTrigger value="fbm">FBM - Sua Logística</TabsTrigger>
              </TabsList>

              <TabsContent value="fba">
                <Card>
                  <CardContent className="p-6">
                    <CalculatorForm
                      mode="fba"
                      productInfo={productInfo}
                      onInputChange={handleInputChange}
                      onCategoryChange={handleCategoryChange}
                      onCalculate={() => calculateResults(productInfo)}
                      onReset={resetForm}
                      onSaveProfile={saveProfile}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fbm">
                <Card>
                  <CardContent className="p-6">
                    <CalculatorForm
                      mode="fbm"
                      productInfo={productInfo}
                      onInputChange={handleInputChange}
                      onCategoryChange={handleCategoryChange}
                      onCalculate={() => calculateResults(productInfo)}
                      onReset={resetForm}
                      onSaveProfile={saveProfile}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <CalculatorResults result={result} productInfo={productInfo} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
