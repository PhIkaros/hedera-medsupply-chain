import { Link } from "react-router-dom";
import { Shield, Scan, TrendingUp, Users, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Hedera",
      description: "Traçabilité sécurisée et immuable de chaque médicament",
    },
    {
      icon: Scan,
      title: "Vérification QR",
      description: "Authentification instantanée par scan de code",
    },
    {
      icon: Sparkles,
      title: "IA Prédictive",
      description: "Détection automatique des anomalies et contrefaçons",
    },
    {
      icon: TrendingUp,
      title: "Analyse en Temps Réel",
      description: "Statistiques et tableaux de bord interactifs",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,191,0.1),transparent_50%)]" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm animate-float">
                🔬 Technologie Hedera Hashgraph
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Sécurité et Traçabilité
              </span>
              <br />
              <span className="text-foreground">des Médicaments</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Authentifiez chaque médicament grâce à la technologie Hedera.
              <br />
              <span className="text-foreground font-semibold">Protection garantie contre la contrefaçon.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/process">
                <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(0,255,191,0.3)] hover:shadow-[0_0_40px_rgba(0,255,191,0.5)] transition-all">
                  Découvrir l'expertise
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/scanner">
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 shadow-[0_0_20px_rgba(0,227,248,0.2)]">
                  <Scan className="mr-2 h-5 w-5" />
                  Scanner un médicament
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Technologie</span> Avancée
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour garantir l'authenticité de chaque médicament
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,255,191,0.2)] group cursor-pointer"
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,191,0.15),transparent_50%)]" />
            <div className="relative p-12 text-center">
              <Users className="h-16 w-16 text-primary mx-auto mb-6 animate-glow" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Rejoignez la révolution pharmaceutique
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Plus de 10,000 lots de médicaments suivis et vérifiés chaque jour
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-[0_0_30px_rgba(0,227,248,0.3)]">
                  Accéder au Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 MedSupply Chain • Powered by <span className="text-primary font-semibold">Hedera Hashgraph</span> 🟣
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Sécurité pharmaceutique en Afrique
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
