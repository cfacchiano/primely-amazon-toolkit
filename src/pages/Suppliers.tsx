
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { PrepCenterList } from "@/components/suppliers/PrepCenterList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { RegisterSupplierForm } from "@/components/suppliers/RegisterSupplierForm";
import { RegisterPrepCenterForm } from "@/components/suppliers/RegisterPrepCenterForm";

export default function Suppliers() {
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [showPrepCenterForm, setShowPrepCenterForm] = useState(false);
  const [activeTab, setActiveTab] = useState("suppliers");

  return (
    <MainLayout>
      <SectionHeader
        title="Fornecedores e Prep Centers"
        description="Gerencie seus fornecedores e prep centers para otimizar sua cadeia de suprimentos"
        action={
          <Button 
            onClick={() => activeTab === "suppliers" 
              ? setShowSupplierForm(true) 
              : setShowPrepCenterForm(true)
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {activeTab === "suppliers" ? "Novo Fornecedor" : "Novo Prep Center"}
          </Button>
        }
      />

      <Tabs defaultValue="suppliers" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
          <TabsTrigger value="prepcenters">Prep Centers</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-6">
          {showSupplierForm ? (
            <RegisterSupplierForm onCancel={() => setShowSupplierForm(false)} />
          ) : (
            <SupplierList />
          )}
        </TabsContent>

        <TabsContent value="prepcenters" className="space-y-6">
          {showPrepCenterForm ? (
            <RegisterPrepCenterForm onCancel={() => setShowPrepCenterForm(false)} />
          ) : (
            <PrepCenterList />
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
