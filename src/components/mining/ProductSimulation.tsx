
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, ArrowLeft, Calculator, PackageOpen } from "lucide-react";
import type { ProductBase, ProductSimulationData, ProductResult } from "@/pages/ProductMining";
import { useToast } from "@/hooks/use-toast";

interface ProductSimulationProps {
  product: ProductBase | null;
  onProductSaved: (product: ProductResult) => void;
  onCancel: () => void;
}

const simulationFormSchema = z.object({
  productCost: z.string().min(1, "Informe o custo do produto"),
  internationalShipping: z.string().optional(),
  importTax: z.string().optional(),
  dollarRate: z.string().min(1, "Informe a cotação do dólar"),
  fbaLogisticsCost: z.string().optional(),
  fbmLogisticsCost: z.string().optional(),
  prepCenterCost: z.string().optional(),
  sellPrice: z.string().min(1, "Informe o preço de venda"),
});

export function ProductSimulation({ product, onProductSaved, onCancel }: ProductSimulationProps) {
  const { toast } = useToast();
  const [simulationResult, setSimulationResult] = useState<ProductResult | null>(null);
  const [activeTab, setActiveTab] = useState<"fba" | "fbm">("fba");
  
  // Set a default dollar rate or fetch from API
  const [currentDollarRate, setCurrentDollarRate] = useState<number>(5.05); 

  const form = useForm<z.infer<typeof simulationFormSchema>>({
    resolver: zodResolver(simulationFormSchema),
    defaultValues: {
      productCost: "",
      internationalShipping: "",
      importTax: "",
      dollarRate: currentDollarRate.toString(),
      fbaLogisticsCost: "",
      fbmLogisticsCost: "",
      prepCenterCost: "",
      sellPrice: "",
    },
  });

  useEffect(() => {
    if (product && 'productCost' in product && 'sellPrice' in product) {
      // If we're editing an existing simulation, populate the form
      const simProduct = product as ProductResult;
      form.reset({
        productCost: simProduct.productCost.toString(),
        internationalShipping: simProduct.internationalShipping.toString(),
        importTax: simProduct.importTax.toString(),
        dollarRate: simProduct.dollarRate.toString(),
        fbaLogisticsCost: simProduct.fbaLogisticsCost.toString(),
        fbmLogisticsCost: simProduct.fbmLogisticsCost.toString(),
        prepCenterCost: simProduct.prepCenterCost.toString(),
        sellPrice: simProduct.sellPrice.toString(),
      });
      
      // Calculate result for existing product
      calculateResult(simProduct as ProductSimulationData);
    }
  }, [product]);

  const calculateResult = (data: ProductSimulationData) => {
    // Convert all values to numbers
    const productCost = Number(data.productCost);
    const internationalShipping = Number(data.internationalShipping || 0);
    const importTax = Number(data.importTax || 0);
    const dollarRate = Number(data.dollarRate);
    const logisticsCost = activeTab === "fba" 
      ? Number(data.fbaLogisticsCost || 0)
      : Number(data.fbmLogisticsCost || 0);
    const prepCenterCost = Number(data.prepCenterCost || 0);
    const sellPrice = Number(data.sellPrice);
    
    // Convert dollar costs to real
    const productCostBRL = productCost * dollarRate;
    const shippingCostBRL = internationalShipping * dollarRate;
    
    // Calculate total unit cost
    const totalUnitCost = productCostBRL + shippingCostBRL + importTax + logisticsCost + prepCenterCost;
    
    // Calculate profit metrics
    const netProfit = sellPrice - totalUnitCost;
    const marginPercentage = (netProfit / sellPrice) * 100;
    const roiPercentage = (netProfit / productCostBRL) * 100;
    
    const result: ProductResult = {
      ...data,
      id: (product as any)?.id || undefined,
      totalUnitCost,
      netProfit,
      marginPercentage,
      roiPercentage,
      status: 'Simulado',
      createdAt: (product as any)?.createdAt || new Date()
    };
    
    setSimulationResult(result);
    return result;
  };

  const onSubmit = (values: z.infer<typeof simulationFormSchema>) => {
    if (!product) {
      toast({
        title: "Erro",
        description: "Dados do produto não encontrados",
        variant: "destructive",
      });
      return;
    }
    
    const simData: ProductSimulationData = {
      ...product,
      productCost: Number(values.productCost),
      internationalShipping: Number(values.internationalShipping || 0),
      importTax: Number(values.importTax || 0),
      dollarRate: Number(values.dollarRate),
      fbaLogisticsCost: Number(values.fbaLogisticsCost || 0),
      fbmLogisticsCost: Number(values.fbmLogisticsCost || 0),
      prepCenterCost: Number(values.prepCenterCost || 0),
      sellPrice: Number(values.sellPrice)
    };
    
    const result = calculateResult(simData);
    
    toast({
      title: "Simulação concluída",
      description: "Os custos e margens foram calculados com sucesso!",
    });
  };

  const handleSaveProduct = () => {
    if (simulationResult) {
      onProductSaved(simulationResult);
      toast({
        title: "Produto salvo",
        description: "O produto foi adicionado à lista com sucesso!",
      });
    }
  };

  // If no product data is available, show a message
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <PackageOpen size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum produto selecionado</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          Volte ao cadastro rápido e registre um novo produto para simular.
        </p>
        <Button onClick={onCancel}>
          <ArrowLeft size={16} className="mr-2" />
          Voltar para Cadastro
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-4 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Produto</h3>
            <p className="font-medium text-base">{product.name}</p>
          </div>
          {product.asin && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">ASIN</h3>
              <p className="font-medium text-base">{product.asin}</p>
            </div>
          )}
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Fornecedor</h3>
            <p className="font-medium text-base">{product.supplier}</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-base font-medium">Custos de Aquisição</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="productCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custo do produto (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dollarRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cotação do dólar (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="internationalShipping"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frete internacional (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="importTax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impostos de importação (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <h3 className="text-base font-medium">Custos Logísticos</h3>
              
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "fba" | "fbm")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="fba">FBA</TabsTrigger>
                  <TabsTrigger value="fbm">FBM</TabsTrigger>
                </TabsList>
                
                <TabsContent value="fba" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="fbaLogisticsCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custo logístico FBA (R$)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="fbm" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="fbmLogisticsCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custo logístico FBM (R$)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
              
              <FormField
                control={form.control}
                name="prepCenterCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custo com PrepCenter (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <FormField
                control={form.control}
                name="sellPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de venda (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-4">Resultado da Simulação</h3>
              {!simulationResult ? (
                <div className="flex flex-col items-center justify-center h-full bg-muted/30 rounded-md p-6">
                  <Calculator size={32} className="text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">
                    Preencha os dados e clique em "Calcular" para visualizar os resultados da simulação.
                  </p>
                </div>
              ) : (
                <Card className="border-2 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Custo Total (R$)</p>
                          <p className="text-xl font-bold">
                            {simulationResult.totalUnitCost.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Lucro Líquido (R$)</p>
                          <p className={`text-xl font-bold ${simulationResult.netProfit < 0 ? 'text-destructive' : 'text-success'}`}>
                            {simulationResult.netProfit.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Margem (%)</p>
                          <p className={`text-xl font-bold ${simulationResult.marginPercentage < 0 ? 'text-destructive' : simulationResult.marginPercentage < 20 ? 'text-warning' : 'text-success'}`}>
                            {simulationResult.marginPercentage.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">ROI (%)</p>
                          <p className={`text-xl font-bold ${simulationResult.roiPercentage < 0 ? 'text-destructive' : simulationResult.roiPercentage < 50 ? 'text-warning' : 'text-success'}`}>
                            {simulationResult.roiPercentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Detalhamento dos custos</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Produto (R$):</div>
                          <div className="text-right">{(simulationResult.productCost * simulationResult.dollarRate).toFixed(2)}</div>
                          
                          <div>Frete Internacional (R$):</div>
                          <div className="text-right">{(simulationResult.internationalShipping * simulationResult.dollarRate).toFixed(2)}</div>
                          
                          <div>Impostos (R$):</div>
                          <div className="text-right">{simulationResult.importTax.toFixed(2)}</div>
                          
                          <div>Logística {activeTab.toUpperCase()} (R$):</div>
                          <div className="text-right">
                            {activeTab === "fba" 
                              ? simulationResult.fbaLogisticsCost.toFixed(2)
                              : simulationResult.fbmLogisticsCost.toFixed(2)
                            }
                          </div>
                          
                          <div>PrepCenter (R$):</div>
                          <div className="text-right">{simulationResult.prepCenterCost.toFixed(2)}</div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          className="w-full" 
                          onClick={handleSaveProduct}
                          variant="outline"
                        >
                          <Save size={16} className="mr-2" />
                          Salvar Produto na Lista
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Button>
            <Button type="submit">
              <Calculator size={16} className="mr-2" />
              Calcular
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
