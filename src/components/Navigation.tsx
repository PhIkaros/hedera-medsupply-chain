import {useContext, useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Context} from "@/App.tsx";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isConnected, userRole} = useContext(Context);
  const [navItems, setNavItems] = useState([
      { path: "/", label: "Accueil" },
      { path: "/process", label: "Processus" },
      { path: "/contact", label: "Contact" },
      { path: "/auth", label: "Sign up" },
  ]);
  const location = useLocation();

  useEffect(() => {
      if (isConnected === true && userRole) {
          // Menu selon le rôle
          const roleMenus: Record<string, any[]> = {
            "Administrateur": [
              {path: "/", label: "Accueil"},
              {path: "/dashboard", label: "Dashboard"},
              {path: "/scanner", label: "Scanner"},
              {path: "/process", label: "Processus"},
              {path: "/statistics", label: "Statistiques"},
              {path: "/profile", label: "Profil"},
              {path: "/contact", label: "Contact"},
              {path: "/logout", label: "Log out"},
            ],
            "Fabricant": [
              {path: "/", label: "Accueil"},
              {path: "/fabricant", label: "Mes lots"},
              {path: "/scanner", label: "Scanner"},
              {path: "/process", label: "Processus"},
              {path: "/profile", label: "Profil"},
              {path: "/contact", label: "Contact"},
              {path: "/logout", label: "Log out"},
            ],
            "Distributeur": [
              {path: "/", label: "Accueil"},
              {path: "/distributeur", label: "Livraisons"},
              {path: "/scanner", label: "Scanner"},
              {path: "/process", label: "Processus"},
              {path: "/profile", label: "Profil"},
              {path: "/contact", label: "Contact"},
              {path: "/logout", label: "Log out"},
            ],
            "Pharmacien": [
              {path: "/", label: "Accueil"},
              {path: "/pharmacien", label: "Vérifications"},
              {path: "/scanner", label: "Scanner"},
              {path: "/process", label: "Processus"},
              {path: "/profile", label: "Profil"},
              {path: "/contact", label: "Contact"},
              {path: "/logout", label: "Log out"},
            ],
            "Utilisateur": [
              {path: "/", label: "Accueil"},
              {path: "/patient", label: "Mon espace"},
              {path: "/scanner", label: "Scanner"},
              {path: "/process", label: "Processus"},
              {path: "/contact", label: "Contact"},
              {path: "/logout", label: "Log out"},
            ],
          };
          
          setNavItems(roleMenus[userRole] || navItems);
      }
  }, [isConnected, userRole]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="h-10 w-10 text-primary animate-glow" />
              <Activity className="h-5 w-5 text-secondary absolute bottom-0 right-0" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MedSupply Chain
              </span>
              <p className="text-xs text-muted-foreground">Powered by Hedera 🟣</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`relative ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,255,191,0.3)]"
                      : "hover:text-primary"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-in slide-in-from-top">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
