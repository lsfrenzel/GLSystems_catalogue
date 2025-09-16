import { useState, ReactNode } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  isActive: boolean;
}

interface AppShellProps {
  title: string;
  subtitle: string;
  systemIcon: string;
  systemColor: string;
  backHref: string;
  statusBadge?: string;
  navItems: NavItem[];
  children: ReactNode;
  currentUser?: string;
}

export default function AppShell({
  title,
  subtitle,
  systemIcon,
  systemColor,
  backHref,
  statusBadge,
  navItems,
  children,
  currentUser = "Sistema Ativo"
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavContent = () => (
    <div className="p-4">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 bg-gradient-to-br ${systemColor} rounded-lg flex items-center justify-center`}>
          <i className={`${systemIcon} text-white`}></i>
        </div>
        <div>
          <h2 className="font-semibold text-current">{title}</h2>
          <p className="text-sm opacity-75">{subtitle}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              item.onClick();
              setIsMobileMenuOpen(false); // Close mobile menu on item click
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              item.isActive 
                ? 'bg-gradient-to-r from-slate-600 to-zinc-700 text-white' 
                : 'text-current opacity-75 hover:opacity-100 hover:bg-white hover:bg-opacity-10'
            }`}
            data-testid={`nav-${item.id}`}
          >
            <i className={`${item.icon} w-4`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 p-3 bg-white bg-opacity-10 rounded-lg">
        <h3 className="font-medium mb-2">Status Operacional</h3>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-zinc-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">S</span>
          </div>
          <div>
            <p className="text-sm font-medium">{currentUser}</p>
            <p className="text-xs opacity-75">24/7 Monitoramento</p>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-white border-opacity-20">
          <p className="text-xs opacity-75">Última Sincronização</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Agora</span>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-900">
      {/* Demo Header */}
      <div className={`bg-gradient-to-r ${systemColor} border-b shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-white hover:bg-opacity-20" data-testid="mobile-menu-trigger">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={`w-64 bg-gradient-to-b ${systemColor} text-white border-r-0`}>
                  <NavContent />
                </SheetContent>
              </Sheet>

              <Link 
                href={backHref}
                className="text-white opacity-75 hover:opacity-100 flex items-center"
                data-testid="back-link"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span className="hidden sm:inline">Voltar</span>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-white opacity-30"></div>
              <h1 className="text-lg sm:text-2xl font-bold text-white raleway truncate">{title}</h1>
            </div>
            {statusBadge && (
              <div className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium hidden sm:block">
                <i className="fas fa-circle text-green-300 mr-2 text-xs"></i>
                {statusBadge}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className={`hidden md:flex w-64 bg-gradient-to-b ${systemColor} border-r shadow-lg min-h-screen text-white`}>
          <NavContent />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}