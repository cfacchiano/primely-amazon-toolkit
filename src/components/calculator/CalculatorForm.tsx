
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Info } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { amazonCategories } from "./calculator-data";
import { useToast } from "@/hooks/use-toast";

export type ProductInfo = {
  asin: string;
  name: string;
  category: string;
  sellPrice: string | number;
  cost: string | number;
  weight: string | number;
  length: string | number;
  width: string | number;
  height: string | number;
  fbaStorageFee: string | number;
  fbmShippingCost: string | number;
};

interface CalculatorFormProps {
  productInfo: ProductInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  onSaveProfile: () => void;
}

export function CalculatorForm({ 
  productInfo, 
  onInputChange, 
  onCategoryChange,
  onCalculate,
  onReset,
  onSaveProfile
}: CalculatorFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Calculator size={18} className="mr-2" />
          Informações do Produto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="asin">ASIN (opcional)</Label>
          <Input
            id="asin"
            name="asin"
            placeholder="Ex: B09ABCDEF1"
            value={productInfo.asin}
            onChange={onInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto (opcional)</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ex: Fone de Ouvido Bluetooth"
            value={productInfo.name}
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
          <p className="text-xs text-muted-foreground mt-1">
            A categoria afeta as taxas de referência da Amazon.
          </p>
        </div>

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

        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2 flex items-center">
            <Info size={14} className="mr-1 text-muted-foreground" />
            Informações Adicionais (opcionais)
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                name="weight"
                placeholder="Ex: 0,3"
                value={productInfo.weight}
                onChange={onInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Altura (cm)</Label>
              <Input
                id="height"
                name="height"
                placeholder="Ex: 15"
                value={productInfo.height}
                onChange={onInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Largura (cm)</Label>
              <Input
                id="width"
                name="width"
                placeholder="Ex: 10"
                value={productInfo.width}
                onChange={onInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Comprimento (cm)</Label>
              <Input
                id="length"
                name="length"
                placeholder="Ex: 20"
                value={productInfo.length}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="space-y-2">
              <Label htmlFor="fbaStorageFee">Taxa FBA (R$)</Label>
              <Input
                id="fbaStorageFee"
                name="fbaStorageFee"
                placeholder="Ex: 5,00"
                value={productInfo.fbaStorageFee}
                onChange={onInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fbmShippingCost">Envio FBM (R$)</Label>
              <Input
                id="fbmShippingCost"
                name="fbmShippingCost"
                placeholder="Ex: 12,00"
                value={productInfo.fbmShippingCost}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>

        <Button className="w-full mt-4" onClick={onCalculate}>
          Calcular Resultados
        </Button>
      </CardContent>
    </Card>
  );
}
