
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NegotiationHistory } from "./NegotiationHistory";

type PrepCenter = {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  leadTime: string;
  location: string;
};

const mockPrepCenters: PrepCenter[] = [
  {
    id: "1",
    name: "FastPrep Services",
    contactName: "Carlos Silva",
    phone: "+55 11 98765-4321",
    email: "contato@fastprep.com.br",
    leadTime: "3 dias",
    location: "São Paulo, SP",
  },
  {
    id: "2",
    name: "Amazon Prep Solutions",
    contactName: "Amanda Johnson",
    phone: "+1 305-555-1234",
    email: "info@amazonprepsolutions.com",
    leadTime: "5 dias",
    location: "Miami, FL",
  },
  {
    id: "3",
    name: "Flex Logistics",
    contactName: "Pedro Gomes",
    phone: "+55 21 3456-7890",
    email: "atendimento@flexlogistics.com.br",
    leadTime: "2 dias",
    location: "Rio de Janeiro, RJ",
  },
];

export function PrepCenterList() {
  const [prepCenters] = useState<PrepCenter[]>(mockPrepCenters);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrepCenterId, setSelectedPrepCenterId] = useState<string | null>(null);

  const filteredPrepCenters = prepCenters.filter((prepCenter) =>
    prepCenter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prepCenter.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {selectedPrepCenterId ? (
        <PrepCenterDetail 
          prepCenterId={selectedPrepCenterId} 
          onBack={() => setSelectedPrepCenterId(null)} 
        />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Prep Centers</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar prep center..."
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
                  <TableHead>Localização</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Tempo de Processamento</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrepCenters.length > 0 ? (
                  filteredPrepCenters.map((prepCenter) => (
                    <TableRow key={prepCenter.id}>
                      <TableCell className="font-medium">{prepCenter.name}</TableCell>
                      <TableCell>{prepCenter.location}</TableCell>
                      <TableCell>{prepCenter.contactName}</TableCell>
                      <TableCell>{prepCenter.email}</TableCell>
                      <TableCell>{prepCenter.phone}</TableCell>
                      <TableCell>{prepCenter.leadTime}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedPrepCenterId(prepCenter.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Nenhum prep center encontrado
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

function PrepCenterDetail({ prepCenterId, onBack }: { prepCenterId: string; onBack: () => void }) {
  // In a real app, you'd fetch the prep center by ID
  const prepCenter = mockPrepCenters.find(p => p.id === prepCenterId);

  if (!prepCenter) {
    return <div>Prep Center não encontrado</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Detalhes do Prep Center: {prepCenter.name}</CardTitle>
        <Button variant="outline" onClick={onBack}>
          Voltar para Lista
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Informações</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="negotiations">Histórico de Negociações</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Nome da Empresa</h3>
                <p className="text-lg">{prepCenter.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Localização</h3>
                <p className="text-lg">{prepCenter.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contato</h3>
                <p className="text-lg">{prepCenter.contactName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-lg">{prepCenter.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
                <p className="text-lg">{prepCenter.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tempo de Processamento</h3>
                <p className="text-lg">{prepCenter.leadTime}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Custo (R$)</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Recebimento</TableCell>
                  <TableCell>R$ 3,00</TableCell>
                  <TableCell>Por caixa</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Etiquetagem</TableCell>
                  <TableCell>R$ 1,20</TableCell>
                  <TableCell>Por unidade</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Embalagem</TableCell>
                  <TableCell>R$ 2,50</TableCell>
                  <TableCell>Por unidade</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inspeção de Qualidade</TableCell>
                  <TableCell>R$ 0,80</TableCell>
                  <TableCell>Por unidade</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Envio para Centro FBA</TableCell>
                  <TableCell>R$ 15,00</TableCell>
                  <TableCell>Por caixa</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="negotiations">
            <NegotiationHistory entityId={prepCenterId} entityType="prepcenter" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
