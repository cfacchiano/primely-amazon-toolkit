
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, FileText, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NegotiationHistory } from "./NegotiationHistory";

type Supplier = {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  leadTime: string;
  lastOrder: string;
};

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Shenzhen Electronics",
    contactName: "Li Wei",
    phone: "+86 123456789",
    email: "contact@shenzhenelec.com",
    leadTime: "30 dias",
    lastOrder: "15/04/2025",
  },
  {
    id: "2",
    name: "Global Import Co.",
    contactName: "John Smith",
    phone: "+1 987654321",
    email: "sales@globalimport.com",
    leadTime: "45 dias",
    lastOrder: "03/03/2025",
  },
  {
    id: "3",
    name: "Tech Innovations Ltd",
    contactName: "Maria Rodriguez",
    phone: "+52 5512345678",
    email: "maria@techinnovations.com",
    leadTime: "20 dias",
    lastOrder: "28/04/2025",
  },
];

export function SupplierList() {
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {selectedSupplierId ? (
        <SupplierDetail 
          supplierId={selectedSupplierId} 
          onBack={() => setSelectedSupplierId(null)} 
        />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fornecedores</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Último Pedido</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.contactName}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.leadTime}</TableCell>
                      <TableCell>{supplier.lastOrder}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedSupplierId(supplier.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Nenhum fornecedor encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SupplierDetail({ supplierId, onBack }: { supplierId: string; onBack: () => void }) {
  // In a real app, you'd fetch the supplier by ID
  const supplier = mockSuppliers.find(s => s.id === supplierId);

  if (!supplier) {
    return <div>Fornecedor não encontrado</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Detalhes do Fornecedor: {supplier.name}</CardTitle>
        <Button variant="outline" onClick={onBack}>
          Voltar para Lista
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Informações</TabsTrigger>
            <TabsTrigger value="costs">Custos de Serviço</TabsTrigger>
            <TabsTrigger value="negotiations">Histórico de Negociações</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Nome da Empresa</h3>
                <p className="text-lg">{supplier.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contato</h3>
                <p className="text-lg">{supplier.contactName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-lg">{supplier.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
                <p className="text-lg">{supplier.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Lead Time</h3>
                <p className="text-lg">{supplier.leadTime}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Último Pedido</h3>
                <p className="text-lg">{supplier.lastOrder}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="costs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Custo (R$)</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Power Bank 10000mAh</TableCell>
                  <TableCell>Fabricação</TableCell>
                  <TableCell>R$ 35,00</TableCell>
                  <TableCell>Por unidade, mínimo 500 unidades</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cabo USB-C 2m</TableCell>
                  <TableCell>Fabricação</TableCell>
                  <TableCell>R$ 8,50</TableCell>
                  <TableCell>Por unidade, mínimo 1000 unidades</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fones Bluetooth</TableCell>
                  <TableCell>Fabricação</TableCell>
                  <TableCell>R$ 45,00</TableCell>
                  <TableCell>Por unidade, mínimo 300 unidades</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="negotiations">
            <NegotiationHistory entityId={supplierId} entityType="supplier" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
