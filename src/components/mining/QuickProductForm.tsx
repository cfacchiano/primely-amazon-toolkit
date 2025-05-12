
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { amazonCategories } from "@/components/calculator/calculator-data";
import { Check, PackageOpen } from "lucide-react";
import type { ProductBase } from "@/pages/ProductMining";

interface QuickProductFormProps {
  onProductRegistered: (product: ProductBase) => void;
}

const productFormSchema = z.object({
  name: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  sku: z.string().optional(),
  asin: z.string().optional(),
  supplier: z.string().min(2, "Nome do fornecedor necessário"),
  category: z.string().min(1, "Selecione uma categoria"),
});

export function QuickProductForm({ onProductRegistered }: QuickProductFormProps) {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      asin: "",
      supplier: "",
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    onProductRegistered({
      name: values.name,
      sku: values.sku || "",
      asin: values.asin || "",
      supplier: values.supplier,
      category: values.category,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Fone de Ouvido TWS" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria Amazon</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-80">
                    {amazonCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do fornecedor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="SKU (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="asin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ASIN</FormLabel>
                  <FormControl>
                    <Input placeholder="ASIN (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <PackageOpen size={16} className="mr-2" />
            Simular Produto
          </Button>
        </div>
      </form>
    </Form>
  );
}
