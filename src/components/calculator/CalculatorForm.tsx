
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { amazonCategories } from "./calculator-data";

export type ProductInfo = {
  asin: string;
  name: string;
  category: string;
  sellPrice: string | number;
  cost: string | number;
  otherCosts: string | number;
  weight: string | number;
  length: string | number;
  width: string | number;
  height: string | number;
  fbaStorageFee: string | number;
  fbmShippingCost: string | number;
};

interface CalculatorFormProps {
  mode: 'fba' | 'fbm';
  productInfo: ProductInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  onSaveProfile: () => void;
}

export function CalculatorForm({ 
  mode,
  productInfo, 
  onInputChange, 
  onCategoryChange,
  onCalculate
}: CalculatorFormProps) {
  const isFBA = mode === 'fba';

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sellPrice">
            Preço de Venda (R$) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="sellPrice"
            name="sellPrice"
            placeholder="Ex: 99,90"
            value={productInfo.sellPrice}
            onChange={onInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={productInfo.category}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {amazonCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cost">
            Custo do Produto (R$) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cost"
            name="cost"
            placeholder="Ex: 45,00"
            value={productInfo.cost}
            onChange={onInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherCosts">
            Outros Custos (R$)
          </Label>
          <Input
            id="otherCosts"
            name="otherCosts"
            placeholder="Ex: 5,00"
            value={productInfo.otherCosts}
            onChange={onInputChange}
          />
        </div>

        {isFBA && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (g)</Label>
                <Input
                  id="weight"
                  name="weight"
                  placeholder="Ex: 300"
                  value={productInfo.weight}
                  onChange={onInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  placeholder="Ex: 15"
                  value={productInfo.height}
                  onChange={onInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Largura (cm)</Label>
                <Input
                  id="width"
                  name="width"
                  placeholder="Ex: 10"
                  value={productInfo.width}
                  onChange={onInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Comprimento (cm)</Label>
                <Input
                  id="length"
                  name="length"
                  placeholder="Ex: 20"
                  value={productInfo.length}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fbaStorageFee">
                Taxa de Armazenamento FBA (R$)
              </Label>
              <Input
                id="fbaStorageFee"
                name="fbaStorageFee"
                placeholder="Ex: 0,34"
                value={productInfo.fbaStorageFee}
                onChange={onInputChange}
              />
            </div>
          </>
        )}

        {!isFBA && (
          <div className="space-y-2">
            <Label htmlFor="fbmShippingCost">
              Custo de Envio FBM (R$)
            </Label>
            <Input
              id="fbmShippingCost"
              name="fbmShippingCost"
              placeholder="Ex: 12,00"
              value={productInfo.fbmShippingCost}
              onChange={onInputChange}
            />
          </div>
        )}
      </div>

      <Button className="w-full" onClick={onCalculate}>
        <Calculator size={16} className="mr-2" />
        Calcular {isFBA ? 'FBA' : 'FBM'}
      </Button>
    </div>
  );
}
