
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { amazonCategories } from "@/components/calculator/calculator-data";
import { PackageOpen } from "lucide-react";
import type { ProductBase } from "@/pages/ProductMining";

interface QuickProductFormProps {
  onProductRegistered: (product: ProductBase) => void;
}

const productFormSchema = z.object({
  name: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  manufacturer: z.string().min(2, "Nome do fabricante necessário"),
  brand: z.string().min(2, "Nome da marca necessário"),
  model: z.string().min(2, "Modelo necessário"),
  upcCode: z.string().optional(),
  dimensions: z.object({
    width: z.string().min(1, "Largura necessária"),
    height: z.string().min(1, "Altura necessária"),
    length: z.string().min(1, "Comprimento necessário"),
  }),
  weight: z.string().min(1, "Peso necessário"),
  characteristics: z.string().min(10, "Características precisam ter pelo menos 10 caracteres"),
  variations: z.object({
    type: z.enum(["color", "color-size", "size-name", "size-color-name"]),
    colorOptions: z.string().optional(),
    sizeOptions: z.string().optional(),
  }),
  price: z.string().min(1, "Preço necessário"),
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
      manufacturer: "",
      brand: "",
      model: "",
      upcCode: "",
      dimensions: {
        width: "",
        height: "",
        length: "",
      },
      weight: "",
      characteristics: "",
      variations: {
        type: "color",
        colorOptions: "",
        sizeOptions: "",
      },
      price: "",
      sku: "",
      asin: "",
      supplier: "",
      category: "",
    },
  });

  const watchVariationType = form.watch("variations.type");

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    onProductRegistered({
      name: values.name,
      manufacturer: values.manufacturer,
      brand: values.brand,
      model: values.model,
      upcCode: values.upcCode || "",
      dimensions: {
        width: values.dimensions.width,
        height: values.dimensions.height,
        length: values.dimensions.length,
      },
      weight: values.weight,
      characteristics: values.characteristics,
      variations: {
        type: values.variations.type,
        colorOptions: values.variations.colorOptions,
        sizeOptions: values.variations.sizeOptions,
      },
      price: values.price,
      sku: values.sku || "",
      asin: values.asin || "",
      supplier: values.supplier,
      category: values.category,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fabricante</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do fabricante" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da marca" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="Modelo do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="upcCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código UPC/EAN/GTIN</FormLabel>
                <FormControl>
                  <Input placeholder="Código de barras (opcional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input placeholder="0,00" type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dimensões e Peso</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="dimensions.width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Largura (cm)</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimensions.height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura (cm)</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimensions.length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprimento (cm)</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="characteristics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva as principais características do produto..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Variações</h3>
          <FormField
            control={form.control}
            name="variations.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Variação</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de variação" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="color">Cor</SelectItem>
                    <SelectItem value="color-size">Cor e Tamanho</SelectItem>
                    <SelectItem value="size-name">Nome do Tamanho</SelectItem>
                    <SelectItem value="size-color-name">Nome do Tamanho e Nome da Cor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {(watchVariationType === "color" || watchVariationType === "color-size" || watchVariationType === "size-color-name") && (
            <FormField
              control={form.control}
              name="variations.colorOptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opções de Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Preto, Branco, Azul (separados por vírgula)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(watchVariationType === "color-size" || watchVariationType === "size-name" || watchVariationType === "size-color-name") && (
            <FormField
              control={form.control}
              name="variations.sizeOptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opções de Tamanho</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: P, M, G, GG (separados por vírgula)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="flex justify-end">
          <Button type="submit">
            <PackageOpen size={16} className="mr-2" />
            Cadastrar Produto
          </Button>
        </div>
      </form>
    </Form>
  );
}
