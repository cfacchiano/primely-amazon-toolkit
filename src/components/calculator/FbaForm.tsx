
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductInfo } from "./CalculatorForm";

interface FbaFormProps {
  productInfo: ProductInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FbaForm({ productInfo, onInputChange }: FbaFormProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fbaStorageFee">Taxa de Armazenamento FBA (R$)</Label>
            <Input
              id="fbaStorageFee"
              name="fbaStorageFee"
              placeholder="Ex: 5,00"
              value={productInfo.fbaStorageFee}
              onChange={onInputChange}
            />
            <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
              <Info size={12} className="mt-0.5 shrink-0" />
              Taxa mensal cobrada pela Amazon para armazenar seu produto nos centros de distribuição.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
