
import { Calculator } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CalculationResult } from "./calculator-data";
import type { ProductInfo } from "./CalculatorForm";
import { ResultsComparison } from "./results/ResultsComparison";
import { ResultsDetails } from "./results/ResultsDetails";

interface CalculatorResultsProps {
  result: CalculationResult | null;
  productInfo: ProductInfo;
  calculationMode: 'fba' | 'fbm';
}

export function CalculatorResults({ result, productInfo, calculationMode }: CalculatorResultsProps) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Calculator size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum cálculo realizado</h3>
        <p className="text-muted-foreground max-w-md">
          Preencha as informações do produto no formulário ao lado e clique em "Calcular Resultados" para visualizar a comparação entre FBA e FBM.
        </p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="comparison">
      <TabsList className="mb-6">
        <TabsTrigger value="comparison">Comparação</TabsTrigger>
        <TabsTrigger value="details">Detalhes</TabsTrigger>
      </TabsList>

      <TabsContent value="comparison" className="space-y-6">
        <ResultsComparison result={result} />
      </TabsContent>
      
      <TabsContent value="details">
        <ResultsDetails result={result} productInfo={productInfo} />
      </TabsContent>
    </Tabs>
  );
}
