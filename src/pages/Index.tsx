
import MainLayout from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  Calculator, 
  ChevronRight, 
  DollarSign, 
  Package, 
  Search, 
  ShoppingCart, 
  StarIcon, 
  TrendingUp 
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for trending products
const trendingProducts = [
  {
    id: "1",
    name: "Fone de Ouvido Bluetooth TWS",
    asin: "B09ABCDEF1",
    bsr: 125,
    price: 89.9,
    profit: 32.5,
    margin: 36.2,
    competition: "Baixa",
    competitionColor: "success",
  },
  {
    id: "2",
    name: "Capa de Celular iPhone 13 Pro",
    asin: "B09ABCDEF2",
    bsr: 82,
    price: 49.9,
    profit: 22.4,
    margin: 44.9,
    competition: "Média",
    competitionColor: "warning",
  },
  {
    id: "3",
    name: "Suporte para Notebook Ajustável",
    asin: "B09ABCDEF3",
    bsr: 278,
    price: 129.9,
    profit: 58.2,
    margin: 44.8,
    competition: "Alta",
    competitionColor: "destructive",
  },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: "1",
    type: "price_change",
    product: "Fone de Ouvido Bluetooth TWS",
    message: "Preço caiu de R$99,90 para R$89,90",
    time: "2h atrás",
  },
  {
    id: "2",
    type: "buybox_lost",
    product: "Capa de Celular iPhone 13 Pro",
    message: "BuyBox perdida para vendedor 'TechStore'",
    time: "5h atrás",
  },
  {
    id: "3",
    type: "opportunity",
    product: "Suporte para Notebook Ajustável",
    message: "Oportunidade: BSR melhorou 25% na semana",
    time: "12h atrás",
  },
];

export default function Index() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <SectionHeader
          title="Dashboard"
          description="Bem-vindo ao Radar Pro Seller. Acompanhe suas métricas e oportunidades."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Produtos Monitorados"
            value="3"
            icon={<Package size={20} />}
            description="Limite: 5 (Plano Gratuito)"
          />
          <StatCard
            title="Lucro Estimado"
            value="R$ 113,10"
            icon={<DollarSign size={20} />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Margem Média"
            value="41.9%"
            icon={<TrendingUp size={20} />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Oportunidades"
            value="2"
            icon={<StarIcon size={20} />}
            description="Baseado nos seus critérios"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                Produtos em Monitoramento
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                  Ver todos <ChevronRight size={14} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground p-2 border-b">
                    <div className="col-span-4">Produto</div>
                    <div className="col-span-2">BSR</div>
                    <div className="col-span-2">Preço</div>
                    <div className="col-span-2">Lucro</div>
                    <div className="col-span-2">Concorrência</div>
                  </div>
                  {trendingProducts.map((product) => (
                    <div key={product.id} className="grid grid-cols-12 px-2 py-3 hover:bg-muted/50 text-sm">
                      <div className="col-span-4 font-medium truncate">{product.name}</div>
                      <div className="col-span-2">#{product.bsr}</div>
                      <div className="col-span-2">R$ {product.price.toFixed(2)}</div>
                      <div className="col-span-2">
                        <span className="text-success">R$ {product.profit.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground ml-1">({product.margin}%)</span>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-${product.competitionColor}/20 text-${product.competitionColor}`}>
                          {product.competition}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {activity.type === 'price_change' && <DollarSign size={16} className="text-primary" />}
                      {activity.type === 'buybox_lost' && <ShoppingCart size={16} className="text-warning" />}
                      {activity.type === 'opportunity' && <StarIcon size={16} className="text-success" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.product}</p>
                      <p className="text-xs text-muted-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/calculator" className="group">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calculator size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Calculadora FBA vs FBM</h3>
                <p className="text-sm text-muted-foreground">Compare lucros e margens para diferentes modelos logísticos.</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/competition" className="group">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Search size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Análise de Concorrência</h3>
                <p className="text-sm text-muted-foreground">Identifique oportunidades e avalie a competição.</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/buybox" className="group">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <ShoppingCart size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Monitor de BuyBox</h3>
                <p className="text-sm text-muted-foreground">Acompanhe quem está vencendo a BuyBox nos seus produtos.</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/analytics" className="group">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <BarChart2 size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Relatórios e Análises</h3>
                <p className="text-sm text-muted-foreground">Visualize dados históricos e tendências de mercado.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
