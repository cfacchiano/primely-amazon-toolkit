
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, Filter, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "Fone de Ouvido TWS",
    asin: "B09XYZ1234",
    category: "Eletrônicos",
    status: "Em Cotação",
    cost: 45.6,
    sellPrice: 129.9,
    roi: 62.5,
    margin: 38.2,
  },
  {
    id: "2",
    name: "Kit Organizador de Gavetas",
    asin: "B08ABC5678",
    category: "Casa",
    status: "Em Estoque",
    cost: 32.8,
    sellPrice: 79.9,
    roi: 48.9,
    margin: 42.3,
  },
  {
    id: "3",
    name: "Luminária de Mesa LED",
    asin: "B07DEF9012",
    category: "Casa",
    status: "Comprado",
    cost: 28.5,
    sellPrice: 69.9,
    roi: 55.2,
    margin: 46.8,
  },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState("minados");
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <SectionHeader
          title="Gestão de Produtos"
          description="Mineração, simulação e acompanhamento de produtos para venda na Amazon."
          action={
            <div className="flex gap-2">
              <Button size="sm" onClick={() => {}}>
                <Plus size={14} className="mr-1" /> Novo Produto
              </Button>
              <Button variant="outline" size="sm" onClick={() => {}}>
                <FileDown size={14} className="mr-1" /> Exportar
              </Button>
            </div>
          }
        />

        <Tabs defaultValue="minados" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="minados">Produtos Minados</TabsTrigger>
            <TabsTrigger value="estoque">Em Estoque</TabsTrigger>
            <TabsTrigger value="vendas">Vendas</TabsTrigger>
          </TabsList>

          <TabsContent value="minados" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Produtos Minados</CardTitle>
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
                        <TableHead className="text-right">ROI %</TableHead>
                        <TableHead className="text-right">Margem %</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.asin}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                              ${product.status === 'Em Estoque' ? 'bg-success/20 text-success' : 
                                product.status === 'Comprado' ? 'bg-warning/20 text-warning' : 
                                'bg-muted/80 text-muted-foreground'}`}>
                              {product.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">R$ {product.cost.toFixed(2)}</TableCell>
                          <TableCell className="text-right">R$ {product.sellPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium text-success">
                            {product.roi.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {product.margin.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="sm">
                              Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estoque" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Produtos em Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total em Estoque</div>
                      <div className="text-2xl font-bold mt-1">24 produtos</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">Estoque FBA</div>
                      <div className="text-2xl font-bold mt-1">16 produtos</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">Estoque FBM</div>
                      <div className="text-2xl font-bold mt-1">8 produtos</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">Em trânsito</div>
                      <div className="text-2xl font-bold mt-1">5 produtos</div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="rounded-md border">
                    {/* Placeholder for estoque table/content */}
                    <div className="p-8 flex flex-col items-center justify-center text-center">
                      <Package size={48} className="text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Módulo em desenvolvimento</h3>
                      <p className="text-muted-foreground mt-2 max-w-md">
                        O controle de estoque está sendo implementado e estará disponível em breve.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendas" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Análise de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total Vendido (30d)</div>
                      <div className="text-2xl font-bold mt-1">R$ 12.450,00</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">Lucro Bruto</div>
                      <div className="text-2xl font-bold mt-1 text-success">R$ 4.890,00</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">Margem Média</div>
                      <div className="text-2xl font-bold mt-1">39,2%</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm font-medium text-muted-foreground">ROI Médio</div>
                      <div className="text-2xl font-bold mt-1">64,8%</div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Placeholder for sales chart */}
                  <div className="h-[300px] rounded-md border flex items-center justify-center">
                    <div className="space-y-4 w-full px-8">
                      <Skeleton className="h-[200px] w-full" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
