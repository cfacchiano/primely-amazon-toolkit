
import { Bell, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="py-2 px-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar produtos, ASINs..."
            className="pl-10 pr-4 py-2 w-full bg-muted rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="text-xs">
          Upgrade para Pro
        </Button>
        
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-muted relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amazon-primary rounded-full"></span>
          </button>
        </div>
        
        <Button variant="ghost" size="sm" className="gap-2">
          <span className="text-sm">Minha Conta</span>
          <ChevronDown size={16} />
        </Button>
      </div>
    </header>
  );
}
