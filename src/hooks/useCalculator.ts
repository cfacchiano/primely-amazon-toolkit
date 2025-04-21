
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ProductInfo } from "@/components/calculator/CalculatorForm";
import type { CalculationResult } from "@/components/calculator/calculator-data";
import { amazonCategories } from "@/components/calculator/calculator-data";

export const useCalculator = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  const calculateResults = (productInfo: ProductInfo) => {
    if (
      productInfo.sellPrice === "" ||
      productInfo.cost === ""
    ) {
      toast({
        title: "Dados insuficientes",
        description: "Preencha pelo menos o preço de venda e o custo do produto.",
        variant: "destructive",
      });
      return;
    }

    const sellPrice = Number(productInfo.sellPrice.toString().replace(",", "."));
    const cost = Number(productInfo.cost.toString().replace(",", "."));
    const weight = productInfo.weight ? Number(productInfo.weight.toString().replace(",", ".")) : 0;
    
    // Parse dimensions and calculate volume in cubic meters
    const length = productInfo.length ? Number(productInfo.length.toString().replace(",", ".")) : 0;
    const width = productInfo.width ? Number(productInfo.width.toString().replace(",", ".")) : 0;
    const height = productInfo.height ? Number(productInfo.height.toString().replace(",", ".")) : 0;
    
    // Convert from cm³ to m³ (divide by 1,000,000)
    const volumeInCubicMeters = (length * width * height) / 1000000;
    
    const selectedCategory = amazonCategories.find(
      (cat) => cat.id === productInfo.category
    );

    const referralFee = selectedCategory ? selectedCategory.referralFee : 0.13;
    
    const fbaReferralFee = sellPrice * referralFee;
    const fbaStorageFee = productInfo.fbaStorageFee ? Number(productInfo.fbaStorageFee.toString().replace(",", ".")) : 5.0;
    const fbaCost = cost + fbaReferralFee + fbaStorageFee;
    const fbaProfit = sellPrice - fbaCost;
    const fbaMargin = (fbaProfit / sellPrice) * 100;
    const fbaRoi = (fbaProfit / cost) * 100;

    const fbmReferralFee = sellPrice * referralFee;
    const fbmShippingCost = productInfo.fbmShippingCost ? Number(productInfo.fbmShippingCost.toString().replace(",", ".")) : 12.0;
    const fbmCost = cost + fbmReferralFee + fbmShippingCost;
    const fbmProfit = sellPrice - fbmCost;
    const fbmMargin = (fbmProfit / sellPrice) * 100;
    const fbmRoi = (fbmProfit / cost) * 100;

    const calculationResult = {
      fbaSellPrice: sellPrice,
      fbmSellPrice: sellPrice,
      fbaReferralFee,
      fbmReferralFee,
      fbaCost,
      fbmCost,
      fbaProfit,
      fbmProfit,
      fbaMargin,
      fbmMargin,
      fbaRoi,
      fbmRoi,
      // Add product dimensions and volume
      productDimensions: {
        length,
        width,
        height,
        volumeInCubicMeters
      }
    };

    setResult(calculationResult);

    toast({
      title: "Cálculo realizado",
      description: "Os resultados foram atualizados com sucesso!",
    });
  };

  return {
    result,
    calculateResults,
    setResult,
  };
};
