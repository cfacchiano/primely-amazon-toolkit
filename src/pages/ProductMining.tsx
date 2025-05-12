
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickProductForm } from "@/components/mining/QuickProductForm";
import { ProductSimulation } from "@/components/mining/ProductSimulation";
import { ProductList } from "@/components/mining/ProductList";

export interface ProductBase {
  id?: string;
  name: string;
  sku: string;
  asin: string;
  supplier: string;
  category: string;
}

export interface ProductSimulationData extends ProductBase {
  productCost: number;
  internationalShipping: number;
  importTax: number;
  dollarRate: number;
  fbaLogisticsCost: number;
  fbmLogisticsCost: number;
  prepCenterCost: number;
  sellPrice: number;
}

export interface ProductResult extends ProductSimulationData {
  totalUnitCost: number;
  netProfit: number;
  marginPercentage: number;
  roiPercentage: number;
  status: 'Simulado' | 'Em Cotação' | 'Comprado' | 'Em Estoque';
  createdAt: Date;
}

export default function ProductMining() {
  const [activeTab, setActiveTab] = useState("register");
  const [selectedProduct, setSelectedProduct] = useState<ProductBase | null>(null);
  const [simulatedProducts, setSimulatedProducts] = useState<ProductResult[]>([]);

  const handleProductRegistered = (product: ProductBase) => {
    setSelectedProduct(product);
    setActiveTab("simulate");
  };

  const handleProductSaved = (product: ProductResult) => {
    // Check if product already exists in the list
    const existingIndex = simulatedProducts.findIndex(p => 
      (p.id && p.id === product.id) || 
      (p.asin && p.asin === product.asin) || 
      (p.sku && p.sku === product.sku)
    );

    if (existingIndex >= 0) {
      // Update existing product
      const updatedProducts = [...simulatedProducts];
      updatedProducts[existingIndex] = product;
      setSimulatedProducts(updatedProducts);
    } else {
      // Add new product with generated ID if not present
      const newProduct = {
        ...product,
        id: product.id || `prod-${Date.now()}`,
        createdAt: new Date()
      };
      setSimulatedProducts([newProduct, ...simulatedProducts]);
    }
    
    setActiveTab("list");
  };

  const handleEditProduct = (product: ProductResult) => {
    setSelectedProduct(product);
    setActiveTab("simulate");
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <SectionHeader
          title="Mineração de Produtos"
          description="Cadastre, simule e analise a viabilidade de novos produtos para venda na Amazon."
        />

        <Tabs defaultValue="register" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="register">Cadastro Rápido</TabsTrigger>
            <TabsTrigger value="simulate">Simulação</TabsTrigger>
            <TabsTrigger value="list">Lista de Produtos</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Cadastro Rápido de Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <QuickProductForm onProductRegistered={handleProductRegistered} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulate">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Simulação de Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductSimulation 
                  product={selectedProduct} 
                  onProductSaved={handleProductSaved} 
                  onCancel={() => setActiveTab("register")} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Lista de Produtos Simulados</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductList 
                  products={simulatedProducts} 
                  onEditProduct={handleEditProduct} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
