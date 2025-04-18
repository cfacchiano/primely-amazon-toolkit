import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Check, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculationResult } from "./calculator-data";

interface CalculatorResultsProps {
  result: CalculationResult | null;
}

export function CalculatorResults({ result }: CalculatorResultsProps) {
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
  );
}
