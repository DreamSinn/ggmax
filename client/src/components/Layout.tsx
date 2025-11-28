import { Calculator, Tag, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
  activeTab: "calculator" | "pricing";
}

export default function Layout({ children, activeTab }: LayoutProps) {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme, switchable } = useTheme();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shadow-sm dark:shadow-lg dark:bg-slate-900 transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-primary">GGMAX TOOLS</h1>
            {switchable && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-muted dark:hover:bg-slate-800 transition-colors"
                title={`Alternar para modo ${theme === "light" ? "escuro" : "claro"}`}
              >
                {theme === "light" ? (
                  <Moon size={18} className="text-muted-foreground" />
                ) : (
                  <Sun size={18} className="text-muted-foreground" />
                )}
              </Button>
            )}
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setLocation("/calculator")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                activeTab === "calculator"
                  ? "bg-primary text-primary-foreground shadow-md dark:shadow-lg"
                  : "text-foreground hover:bg-muted dark:hover:bg-slate-800"
              }`}
            >
              <Calculator size={20} />
              <span className="font-medium">Calculadora de Taxas</span>
            </button>
            <button
              onClick={() => setLocation("/pricing")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                activeTab === "pricing"
                  ? "bg-primary text-primary-foreground shadow-md dark:shadow-lg"
                  : "text-foreground hover:bg-muted dark:hover:bg-slate-800"
              }`}
            >
              <Tag size={20} />
              <span className="font-medium">Gerador de Preços</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-background via-background to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
