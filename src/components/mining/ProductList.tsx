
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProductResult } from "@/pages/ProductMining";
import { Edit, Filter } from "lucide-react";

interface ProductListProps {
  products: ProductResult[];
  onEditProduct: (product: ProductResult) => void;
}

export function ProductList({ products, onEditProduct }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("roiPercentage");

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Apply status filter
      if (statusFilter !== "all" && product.status !== statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(search) ||
          product.asin.toLowerCase().includes(search) ||
          product.sku.toLowerCase().includes(search) ||
          product.supplier.toLowerCase().includes(search)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "roiPercentage":
          return b.roiPercentage - a.roiPercentage;
        case "marginPercentage":
          return b.marginPercentage - a.marginPercentage;
        case "netProfit":
          return b.netProfit - a.netProfit;
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  // Handle empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <Filter size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum produto simulado</h3>
        <p className="text-muted-foreground max-w-md">
          Faça a simulação de produtos para que eles apareçam nesta lista.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome, ASIN, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="Simulado">Simulado</SelectItem>
              <SelectItem value="Em Cotação">Em Cotação</SelectItem>
              <SelectItem value="Comprado">Comprado</SelectItem>
              <SelectItem value="Em Estoque">Em Estoque</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="roiPercentage">Maior ROI</SelectItem>
              <SelectItem value="marginPercentage">Maior Margem</SelectItem>
              <SelectItem value="netProfit">Maior Lucro</SelectItem>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="date">Mais recente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Custo Total</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Lucro</TableHead>
              <TableHead className="text-right">Margem</TableHead>
              <TableHead className="text-right">ROI</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div>
                    {product.name}
                    {product.asin && (
                      <div className="text-xs text-muted-foreground mt-1">
                        ASIN: {product.asin}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${product.status === 'Em Estoque' ? 'bg-success/20 text-success' : 
                      product.status === 'Comprado' ? 'bg-warning/20 text-warning' : 
                      product.status === 'Em Cotação' ? 'bg-primary/20 text-primary' :
                      'bg-muted/80 text-muted-foreground'}`}>
                    {product.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">R$ {product.totalUnitCost.toFixed(2)}</TableCell>
                <TableCell className="text-right">R$ {product.sellPrice.toFixed(2)}</TableCell>
                <TableCell className={`text-right font-medium ${product.netProfit < 0 ? 'text-destructive' : 'text-success'}`}>
                  R$ {product.netProfit.toFixed(2)}
                </TableCell>
                <TableCell className={`text-right ${product.marginPercentage < 0 ? 'text-destructive' : product.marginPercentage < 20 ? 'text-warning' : 'text-success'}`}>
                  {product.marginPercentage.toFixed(1)}%
                </TableCell>
                <TableCell className={`text-right font-medium ${product.roiPercentage < 0 ? 'text-destructive' : product.roiPercentage < 50 ? 'text-warning' : 'text-success'}`}>
                  {product.roiPercentage.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" onClick={() => onEditProduct(product)}>
                    <Edit size={14} className="mr-1" />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
