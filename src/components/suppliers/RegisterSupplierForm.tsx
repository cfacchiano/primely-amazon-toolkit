
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ServiceCostsTable } from "./ServiceCostsTable";

const supplierSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  contactName: z.string().optional(),
  email: z.string().email({ message: "Email inválido" }).optional(),
  phone: z.string().optional(),
  leadTime: z.string().min(1, { message: "Prazo de entrega é obrigatório" }),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

const defaultValues: Partial<SupplierFormValues> = {
  name: "",
  contactName: "",
  email: "",
  phone: "",
  leadTime: "",
  address: "",
  notes: "",
};

export function RegisterSupplierForm({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState<"details" | "costs">("details");
  
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: SupplierFormValues) {
    if (step === "details") {
      setStep("costs");
      return;
    }

    toast.success("Fornecedor cadastrado com sucesso!");
    console.log("Supplier data:", data);
    onCancel();
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{step === "details" ? "Cadastro de Fornecedor" : "Custos de Serviços"}</CardTitle>
      </CardHeader>
      <CardContent>
        {step === "details" ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Fornecedor*</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do contato principal" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leadTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prazo de Entrega (Lead Time)*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 30 dias" {...field} />
                      </FormControl>
                      <FormDescription>
                        Tempo médio de entrega após o pedido
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço completo" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Informações adicionais sobre o fornecedor" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Próximo: Custos de Serviço
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <ServiceCostsTable 
            entityType="supplier" 
            onBack={() => setStep("details")}
            onSave={() => {
              form.handleSubmit(onSubmit)();
            }}
            onCancel={onCancel}
          />
        )}
      </CardContent>
    </Card>
  );
}
