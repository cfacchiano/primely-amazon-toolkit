
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ProductInfo } from "@/components/calculator/CalculatorForm";
import type { CalculationResult } from "@/components/calculator/calculator-data";
import { amazonCategories } from "@/components/calculator/calculator-data";
import { storageFeePerCubicMeter, getFbaLogisticsFee } from "@/components/calculator/fba-fees";

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
    const otherCosts = productInfo.otherCosts ? Number(productInfo.otherCosts.toString().replace(",", ".")) : 0;
    
    // Converte peso de gramas para kg
    const weightInKg = productInfo.weight ? Number(productInfo.weight.toString().replace(",", ".")) / 1000 : 0;
    
    // Calcula dimensões e volume em metros cúbicos
    const length = productInfo.length ? Number(productInfo.length.toString().replace(",", ".")) : 0;
    const width = productInfo.width ? Number(productInfo.width.toString().replace(",", ".")) : 0;
    const height = productInfo.height ? Number(productInfo.height.toString().replace(",", ".")) : 0;
    
    // Converte cm³ para m³ (divide por 1,000,000)
    const volumeInCubicMeters = (length * width * height) / 1000000;
    
    const selectedCategory = amazonCategories.find(
      (cat) => cat.id === productInfo.category
    );

    const referralFee = selectedCategory ? selectedCategory.referralFee : 0.15;
    
    // Calcula taxas FBA
    const fbaReferralFee = sellPrice * referralFee;
    
    // Taxa de armazenamento baseada no volume
    // Se o usuário informou um valor manual de taxa de armazenamento, use esse valor
    const fbaStorageFee = productInfo.fbaStorageFee && productInfo.fbaStorageFee !== "" 
      ? Number(productInfo.fbaStorageFee.toString().replace(",", ".")) 
      : volumeInCubicMeters * storageFeePerCubicMeter;
    
    // Taxa de logística baseada no peso
    const fbaLogisticsFee = getFbaLogisticsFee(weightInKg);
    
    const fbaTotalFees = fbaReferralFee + fbaStorageFee + fbaLogisticsFee;
    const fbaTotalCost = cost + otherCosts + fbaTotalFees;
    const fbaProfit = sellPrice - fbaTotalCost;
    const fbaMargin = (fbaProfit / sellPrice) * 100;
    const fbaRoi = (fbaProfit / cost) * 100;

    // Calcula taxas FBM
    const fbmReferralFee = sellPrice * referralFee;
    const fbmShippingCost = productInfo.fbmShippingCost ? Number(productInfo.fbmShippingCost.toString().replace(",", ".")) : 12.0;
    const fbmTotalCost = cost + otherCosts + fbmReferralFee + fbmShippingCost;
    const fbmProfit = sellPrice - fbmTotalCost;
    const fbmMargin = (fbmProfit / sellPrice) * 100;
    const fbmRoi = (fbmProfit / cost) * 100;

    const calculationResult: CalculationResult = {
      fbaSellPrice: sellPrice,
      fbmSellPrice: sellPrice,
      fbaReferralFee,
      fbmReferralFee,
      fbaCost: fbaTotalCost,
      fbmCost: fbmTotalCost,
      fbaProfit,
      fbmProfit,
      fbaMargin,
      fbmMargin,
      fbaRoi,
      fbmRoi,
      fbaStorageFee,
      fbaLogisticsFee,
      productDimensions: {
        length,
        width,
        height,
        volumeInCubicMeters,
        weightInKg
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
