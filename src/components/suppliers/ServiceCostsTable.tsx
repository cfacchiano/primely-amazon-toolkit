
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

type ServiceCost = {
  id: string;
  productName: string;
  serviceName: string;
  cost: string;
  notes: string;
};

type ServiceCostsTableProps = {
  entityType: "supplier" | "prepcenter";
  onBack: () => void;
  onSave: () => void;
  onCancel: () => void;
};

export function ServiceCostsTable({ entityType, onBack, onSave, onCancel }: ServiceCostsTableProps) {
  const [costs, setCosts] = useState<ServiceCost[]>([
    {
      id: "1",
      productName: "Produto de exemplo",
      serviceName: entityType === "supplier" ? "Fabricação" : "Recebimento",
      cost: "10.00",
      notes: "Por unidade",
    },
  ]);

  const addCost = () => {
    const newId = (costs.length + 1).toString();
    setCosts([
      ...costs,
      {
        id: newId,
        productName: "",
        serviceName: "",
        cost: "",
        notes: "",
      },
    ]);
  };

  const removeCost = (id: string) => {
    setCosts(costs.filter((cost) => cost.id !== id));
  };

  const updateCost = (id: string, field: keyof ServiceCost, value: string) => {
    setCosts(
      costs.map((cost) => (cost.id === id ? { ...cost, [field]: value } : cost))
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          {entityType === "supplier" 
            ? "Custos por Produto do Fornecedor" 
            : "Serviços Oferecidos pelo Prep Center"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {entityType === "supplier" 
            ? "Registre os custos de cada produto fornecido" 
            : "Registre os custos de cada serviço oferecido"}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>{entityType === "supplier" ? "Serviço" : "Tipo de Serviço"}</TableHead>
            <TableHead>Custo (R$)</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {costs.map((cost) => (
            <TableRow key={cost.id}>
              <TableCell>
                <Input
                  value={cost.productName}
                  onChange={(e) => updateCost(cost.id, "productName", e.target.value)}
                  placeholder="Nome do produto"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={cost.serviceName}
                  onChange={(e) => updateCost(cost.id, "serviceName", e.target.value)}
                  placeholder={entityType === "supplier" ? "Tipo de serviço" : "Ex: Etiquetagem"}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={cost.cost}
                  onChange={(e) => updateCost(cost.id, "cost", e.target.value)}
                  placeholder="0.00"
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={cost.notes}
                  onChange={(e) => updateCost(cost.id, "notes", e.target.value)}
                  placeholder="Ex: por unidade"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCost(cost.id)}
                  disabled={costs.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="outline" onClick={addCost} className="mt-4">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Linha
      </Button>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Voltar para Detalhes
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onSave}>
            Salvar {entityType === "supplier" ? "Fornecedor" : "Prep Center"}
          </Button>
        </div>
      </div>
    </div>
  );
}
