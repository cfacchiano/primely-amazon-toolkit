
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculationResult } from "../calculator-data";
import type { ProductInfo } from "../CalculatorForm";

interface ResultsDetailsProps {
  result: CalculationResult;
  productInfo: ProductInfo;
}

export function ResultsDetails({ result, productInfo }: ResultsDetailsProps) {
  // Format function to handle number display with commas for decimals (Brazilian format)
  const formatNumber = (value: number, decimals = 2) => {
    return value.toFixed(decimals).replace('.', ',');
  };

  // Check if dimensions are available
  const hasDimensions = 
    productInfo.length && 
    productInfo.width && 
    productInfo.height && 
    result.productDimensions?.volumeInCubicMeters;

  return (
    <div className="space-y-6">
      {/* Product Dimensions Card */}
      {hasDimensions && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Dimensões do Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Comprimento</span>
                <span>{formatNumber(Number(productInfo.length))} cm</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Largura</span>
                <span>{formatNumber(Number(productInfo.width))} cm</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Altura</span>
                <span>{formatNumber(Number(productInfo.height))} cm</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Peso</span>
                <span>{formatNumber(Number(productInfo.weight))} g</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2 font-medium">
                <span>Volume</span>
                <span>{formatNumber(result.productDimensions?.volumeInCubicMeters || 0, 6)} m³</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Detalhes FBA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Preço de Venda</span>
                <span>R$ {formatNumber(result.fbaSellPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Custo do Produto</span>
                <span>R$ {formatNumber(Number(productInfo.cost))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Referência</span>
                <span>R$ {formatNumber(result.fbaReferralFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa FBA</span>
                <span>R$ {formatNumber(productInfo.fbaStorageFee ? Number(productInfo.fbaStorageFee) : 5.0)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="font-medium">Custo Total</span>
                <span className="font-medium">R$ {formatNumber(result.fbaCost)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="font-medium">Lucro Líquido</span>
                <span className={`font-medium ${result.fbaProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                  R$ {formatNumber(result.fbaProfit)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Margem</span>
                <span className={`font-medium ${result.fbaMargin >= 20 ? 'text-success' : result.fbaMargin >= 10 ? 'text-warning' : 'text-destructive'}`}>
                  {formatNumber(result.fbaMargin)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">ROI</span>
                <span className={`font-medium ${result.fbaRoi >= 30 ? 'text-success' : result.fbaRoi >= 15 ? 'text-warning' : 'text-destructive'}`}>
                  {formatNumber(result.fbaRoi)}%
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
                <span>R$ {formatNumber(result.fbmSellPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Custo do Produto</span>
                <span>R$ {formatNumber(Number(productInfo.cost))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Referência</span>
                <span>R$ {formatNumber(result.fbmReferralFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Custo de Envio</span>
                <span>R$ {formatNumber(productInfo.fbmShippingCost ? Number(productInfo.fbmShippingCost) : 12.0)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="font-medium">Custo Total</span>
                <span className="font-medium">R$ {formatNumber(result.fbmCost)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="font-medium">Lucro Líquido</span>
                <span className={`font-medium ${result.fbmProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                  R$ {formatNumber(result.fbmProfit)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Margem</span>
                <span className={`font-medium ${result.fbmMargin >= 20 ? 'text-success' : result.fbmMargin >= 10 ? 'text-warning' : 'text-destructive'}`}>
                  {formatNumber(result.fbmMargin)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">ROI</span>
                <span className={`font-medium ${result.fbmRoi >= 30 ? 'text-success' : result.fbmRoi >= 15 ? 'text-warning' : 'text-destructive'}`}>
                  {formatNumber(result.fbmRoi)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
