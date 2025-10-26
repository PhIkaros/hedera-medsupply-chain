import {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import {Context} from "@/App.tsx";

const Auth = () => {
  const navigate = useNavigate();
  const {isConnected, setIsConnected, setUserRole, setUserName, setUserEmail, setUserOrganization} = useContext(Context);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Utilisateur",
    organization: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Pour la démo, on utilise les données stockées lors de l'inscription
    const storedName = localStorage.getItem("userName") || "Utilisateur";
    const storedRole = localStorage.getItem("userRole") || "Administrateur";
    const storedOrganization = localStorage.getItem("userOrganization") || "";
    
    setUserName(storedName);
    setUserEmail(loginData.email);
    setUserRole(storedRole);
    setUserOrganization(storedOrganization);

    toast.success("Connexion réussie !");
    localStorage.setItem("isConnected", "true");
    localStorage.setItem("userEmail", loginData.email);
    setIsConnected(true);

    // Redirection selon le rôle
    const roleRoutes: Record<string, string> = {
      "Administrateur": "/dashboard",
      "Fabricant": "/fabricant",
      "Distributeur": "/distributeur",
      "Pharmacien": "/pharmacien",
      "Utilisateur": "/patient"
    };
    
    setTimeout(() => navigate(roleRoutes[storedRole] || "/dashboard"), 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    // Stocker les informations utilisateur
    localStorage.setItem("isConnected", "true");
    localStorage.setItem("userRole", signupData.role);
    localStorage.setItem("userName", signupData.name);
    localStorage.setItem("userEmail", signupData.email);
    localStorage.setItem("userOrganization", signupData.organization);
    
    setIsConnected(true);
    setUserRole(signupData.role);
    setUserName(signupData.name);
    setUserEmail(signupData.email);
    setUserOrganization(signupData.organization);

    toast.success("Compte créé avec succès !");
    
    // Redirection selon le rôle
    const roleRoutes: Record<string, string> = {
      "Administrateur": "/dashboard",
      "Fabricant": "/fabricant",
      "Distributeur": "/distributeur",
      "Pharmacien": "/pharmacien",
      "Utilisateur": "/patient"
    };
    
    setTimeout(() => navigate(roleRoutes[signupData.role] || "/"), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Shield className="h-8 w-8 text-primary animate-glow" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-primary">Accès</span> au votre profile
            </h1>
            <p className="text-muted-foreground">
              Connectez-vous
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="exemple@gmail.com"
                        className="pl-10 bg-background"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-background"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,191,0.3)]"
                  >
                    Se connecter
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Dr. Amadou Diallo"
                        className="pl-10 bg-background"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="exemple@gmail.com"
                        className="pl-10 bg-background"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-background"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-confirm">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-background"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-role">Rôle</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <select
                        id="signup-role"
                        className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        value={signupData.role}
                        onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                      >
                        <option value="Utilisateur">Utilisateur (Patient)</option>
                        <option value="Fabricant">Fabricant</option>
                        <option value="Distributeur">Distributeur</option>
                        <option value="Pharmacien">Pharmacien</option>
                        <option value="Administrateur">Administrateur</option>
                      </select>
                    </div>
                  </div>

                  {signupData.role !== "Utilisateur" && (
                    <div>
                      <Label htmlFor="signup-organization">
                        {signupData.role === "Fabricant" ? "Entreprise" :
                         signupData.role === "Distributeur" ? "Société de transport" :
                         signupData.role === "Pharmacien" ? "Pharmacie" : "Organisation"}
                      </Label>
                      <Input
                        id="signup-organization"
                        placeholder={
                          signupData.role === "Fabricant" ? "Ex: PharmaCorp Afrique" :
                          signupData.role === "Distributeur" ? "Ex: TransMed Express" :
                          signupData.role === "Pharmacien" ? "Ex: Pharmacie Centrale" :
                          "Nom de votre organisation"
                        }
                        className="bg-background"
                        value={signupData.organization}
                        onChange={(e) => setSignupData({ ...signupData, organization: e.target.value })}
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,191,0.3)]"
                  >
                    Créer un compte
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Retour à l'accueil
              </Link>
            </div>
          </Card>

          <Card className="mt-6 p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 backdrop-blur-sm text-center">
            <p className="text-sm text-muted-foreground">
              🔒 Connexion sécurisée via <span className="text-primary font-semibold">Hedera Hashgraph</span>
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
