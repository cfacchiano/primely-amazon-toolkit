
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { FileText, Plus } from "lucide-react";

type Negotiation = {
  id: string;
  date: string;
  details: string;
  outcomes: string;
  attachments?: string[];
};

type NegotiationHistoryProps = {
  entityId: string;
  entityType: "supplier" | "prepcenter";
};

export function NegotiationHistory({ entityId, entityType }: NegotiationHistoryProps) {
  // In a real app, you'd fetch negotiations by entityId
  const [negotiations, setNegotiations] = useState<Negotiation[]>([
    {
      id: "1",
      date: "10/04/2025",
      details: "Negociação sobre redução de preço para pedidos acima de 1000 unidades",
      outcomes: "Conseguimos 5% de desconto para pedidos acima de 1000 unidades",
    },
    {
      id: "2",
      date: "25/03/2025",
      details: "Discussão sobre prazos de entrega",
      outcomes: "Concordaram em reduzir o lead time de 45 para 30 dias para clientes preferenciais",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newNegotiation, setNewNegotiation] = useState<Omit<Negotiation, "id">>({
    date: new Date().toLocaleDateString("pt-BR"),
    details: "",
    outcomes: "",
  });

  const handleAddNegotiation = () => {
    if (!newNegotiation.details) {
      toast.error("Por favor, preencha os detalhes da negociação");
      return;
    }

    const newId = (negotiations.length + 1).toString();
    setNegotiations([
      {
        id: newId,
        ...newNegotiation,
      },
      ...negotiations,
    ]);
    
    setNewNegotiation({
      date: new Date().toLocaleDateString("pt-BR"),
      details: "",
      outcomes: "",
    });
    
    setShowAddForm(false);
    toast.success("Negociação registrada com sucesso!");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          Histórico de Negociações com {entityType === "supplier" ? "Fornecedor" : "Prep Center"}
        </h3>
        {!showAddForm && (
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Negociação
          </Button>
        )}
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Data</label>
                  <Input
                    type="date"
                    value={newNegotiation.date}
                    onChange={(e) =>
                      setNewNegotiation({ ...newNegotiation, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Detalhes da Negociação</label>
                <Textarea
                  value={newNegotiation.details}
                  onChange={(e) =>
                    setNewNegotiation({ ...newNegotiation, details: e.target.value })
                  }
                  placeholder="Descreva os detalhes da negociação..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Resultados</label>
                <Textarea
                  value={newNegotiation.outcomes}
                  onChange={(e) =>
                    setNewNegotiation({ ...newNegotiation, outcomes: e.target.value })
                  }
                  placeholder="Descreva os resultados obtidos..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddNegotiation}>
                  Registrar Negociação
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {negotiations.length > 0 ? (
          negotiations.map((negotiation) => (
            <Card key={negotiation.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium mb-2">{negotiation.date}</div>
                    <div className="text-sm mb-1">
                      <span className="font-medium">Detalhes: </span>
                      {negotiation.details}
                    </div>
                    {negotiation.outcomes && (
                      <div className="text-sm">
                        <span className="font-medium">Resultados: </span>
                        {negotiation.outcomes}
                      </div>
                    )}
                  </div>
                  {negotiation.attachments && (
                    <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Nenhum registro de negociação encontrado
          </div>
        )}
      </div>
    </div>
  );
}
