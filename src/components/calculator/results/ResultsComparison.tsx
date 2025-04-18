
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import type { CalculationResult } from "../calculator-data";

interface ResultsComparisonProps {
  result: CalculationResult;
}

export function ResultsComparison({ result }: ResultsComparisonProps) {
  return (
    <>
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
    </>
  );
}
