import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickProductForm } from "@/components/mining/QuickProductForm";
import { ProductList } from "@/components/mining/ProductList";
import { Button } from "@/components/ui/button";
import { Filter, Eye, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface ProductBase {
  id?: string;
  name: string;
  manufacturer: string;
  brand: string;
  model: string;
  upcCode: string;
  dimensions: {
    width: string;
    height: string;
    length: string;
  };
  weight: string;
  characteristics: string;
  variations: {
    type: 'color' | 'color-size' | 'size-name' | 'size-color-name';
    colorOptions?: string;
    sizeOptions?: string;
  };
  price: string;
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

// Sample mined products data with additional fields
const minedProducts = [
  {
    id: "m1",
    name: "Suporte para Celular Ajustável",
    asin: "B10XYZ9876",
    category: "Acessórios",
    status: "Simulado",
    cost: 15.2,
    sellPrice: 45.9,
    roi: 85.2,
    margin: 52.1,
    taxes: 6.8,
    shipping: 8.5,
  },
  {
    id: "m2",
    name: "Cabo USB-C Reforçado",
    asin: "B11ABC5432",
    category: "Eletrônicos",
    status: "Em Cotação",
    cost: 8.9,
    sellPrice: 29.9,
    roi: 78.4,
    margin: 58.3,
    taxes: 4.2,
    shipping: 5.8,
  },
  {
    id: "m3",
    name: "Organizador de Mesa Bambu",
    asin: "B12DEF7890",
    category: "Casa",
    status: "Comprado",
    cost: 22.5,
    sellPrice: 59.9,
    roi: 65.8,
    margin: 45.2,
    taxes: 8.5,
    shipping: 12.2,
  },
];

export default function ProductMining() {
  const [activeTab, setActiveTab] = useState("register");
  const [simulatedProducts, setSimulatedProducts] = useState<ProductResult[]>([]);

  const handleProductRegistered = (product: ProductBase) => {
    // Just switch to the products list tab after registration
    setActiveTab("minerados");
  };

  const handleEditProduct = (product: any) => {
    // Handle edit functionality if needed
    console.log("Editing product:", product);
  };

  const handleViewDetails = (product: any) => {
    // Handle view details functionality if needed
    console.log("Viewing product details:", product);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <SectionHeader
          title="Mineração de Produtos"
          description="Cadastre, simule e analise a viabilidade de novos produtos para venda na Amazon."
        />

        <Tabs defaultValue="register" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="register">Cadastro Rápido</TabsTrigger>
            <TabsTrigger value="minerados">Produtos Minerados</TabsTrigger>
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

          <TabsContent value="minerados" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Produtos Minerados</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter size={14} className="mr-1" /> Filtrar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>ASIN</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Custo</TableHead>
                        <TableHead className="text-right">Preço</TableHead>
                        <TableHead className="text-right">Imposto</TableHead>
                        <TableHead className="text-right">Frete</TableHead>
                        <TableHead className="text-right">ROI %</TableHead>
                        <TableHead className="text-right">Margem %</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {minedProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.asin}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                              ${product.status === 'Em Estoque' ? 'bg-success/20 text-success' : 
                                product.status === 'Comprado' ? 'bg-warning/20 text-warning' : 
                                product.status === 'Em Cotação' ? 'bg-primary/20 text-primary' :
                                'bg-muted/80 text-muted-foreground'}`}>
                              {product.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">R$ {product.cost.toFixed(2)}</TableCell>
                          <TableCell className="text-right">R$ {product.sellPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">R$ {product.taxes.toFixed(2)}</TableCell>
                          <TableCell className="text-right">R$ {product.shipping.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium text-success">
                            {product.roi.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {product.margin.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewDetails(product)}>
                                <Eye size={14} className="mr-1" />
                                Detalhes
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                                <Edit size={14} className="mr-1" />
                                Editar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
