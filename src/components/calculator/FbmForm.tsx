
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductInfo } from "./CalculatorForm";

interface FbmFormProps {
  productInfo: ProductInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FbmForm({ productInfo, onInputChange }: FbmFormProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fbmShippingCost">Custo de Envio FBM (R$)</Label>
            <Input
              id="fbmShippingCost"
              name="fbmShippingCost"
              placeholder="Ex: 12,00"
              value={productInfo.fbmShippingCost}
              onChange={onInputChange}
            />
            <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
              <Info size={12} className="mt-0.5 shrink-0" />
              Custo médio para enviar o produto diretamente ao cliente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
