
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculationResult } from "../calculator-data";
import type { ProductInfo } from "../CalculatorForm";

interface ResultsDetailsProps {
  result: CalculationResult;
  productInfo: ProductInfo;
}

export function ResultsDetails({ result, productInfo }: ResultsDetailsProps) {
  return (
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
  );
}
