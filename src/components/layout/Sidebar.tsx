
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart2, 
  Calculator, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  DollarSign, 
  Home, 
  LayoutDashboard, 
  Package, 
  Search, 
  Settings, 
  ShoppingCart, 
  UserCircle,
  PackageOpen,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarLinkProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  active?: boolean;
};

const SidebarLink = ({ icon: Icon, label, to, collapsed, active = false }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
        "hover:bg-sidebar-accent text-sidebar-foreground",
        active && "bg-sidebar-accent"
      )}
    >
      <Icon size={20} className={active ? "text-primary" : "text-sidebar-foreground"} />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

type SidebarGroupProps = {
  title: string;
  children: React.ReactNode;
  collapsed: boolean;
};

const SidebarGroup = ({ title, children, collapsed }: SidebarGroupProps) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2 px-3">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 fixed top-0 left-0 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center px-4 py-5 justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Compass size={24} className="text-amazon-primary" />
            <h1 className="font-bold text-lg text-sidebar-foreground leading-none">
              Radar <span className="text-amazon-primary">Pro</span>
            </h1>
          </div>
        )}
        {collapsed && <Compass size={24} className="text-amazon-primary mx-auto" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-1 hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 py-4 px-2 overflow-y-auto scrollbar-hide">
        <SidebarGroup title="Principal" collapsed={collapsed}>
          <SidebarLink
            to="/"
            icon={LayoutDashboard}
            label="Dashboard"
            collapsed={collapsed}
            active={isActive("/")}
          />
          <SidebarLink
            to="/calculator"
            icon={Calculator}
            label="Calculadora FBA/FBM"
            collapsed={collapsed}
            active={isActive("/calculator")}
          />
          <SidebarLink
            to="/mining"
            icon={PackageOpen}
            label="Mineração de Produtos"
            collapsed={collapsed}
            active={isActive("/mining")}
          />
          <SidebarLink
            to="/products"
            icon={Package}
            label="Gestão de Produtos"
            collapsed={collapsed}
            active={isActive("/products")}
          />
          <SidebarLink
            to="/suppliers"
            icon={Truck}
            label="Fornecedores e Prep Centers"
            collapsed={collapsed}
            active={isActive("/suppliers")}
          />
          <SidebarLink
            to="/competition"
            icon={Search}
            label="Análise de Concorrência"
            collapsed={collapsed}
            active={isActive("/competition")}
          />
          <SidebarLink
            to="/buybox"
            icon={ShoppingCart}
            label="Monitoramento BuyBox"
            collapsed={collapsed}
            active={isActive("/buybox")}
          />
        </SidebarGroup>

        <SidebarGroup title="Análises" collapsed={collapsed}>
          <SidebarLink
            to="/analytics"
            icon={BarChart2}
            label="Relatórios"
            collapsed={collapsed}
            active={isActive("/analytics")}
          />
          <SidebarLink
            to="/profits"
            icon={DollarSign}
            label="Lucros e Margens"
            collapsed={collapsed}
            active={isActive("/profits")}
          />
        </SidebarGroup>

        <SidebarGroup title="Configurações" collapsed={collapsed}>
          <SidebarLink
            to="/settings"
            icon={Settings}
            label="Configurações"
            collapsed={collapsed}
            active={isActive("/settings")}
          />
          <SidebarLink
            to="/profile"
            icon={UserCircle}
            label="Perfil"
            collapsed={collapsed}
            active={isActive("/profile")}
          />
        </SidebarGroup>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground">
            VP
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Vendedor Pro</p>
              <p className="text-xs text-muted-foreground">Plano Gratuito</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
