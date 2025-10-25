import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Factory, Truck, Building2, Store, User, CheckCircle } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: Factory,
      title: "Fabrication",
      description: "Le médicament est produit et enregistré sur la blockchain",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
    },
    {
      icon: Truck,
      title: "Transport",
      description: "Suivi en temps réel du trajet jusqu'au distributeur",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/30",
    },
    {
      icon: Building2,
      title: "Distribution",
      description: "Réception et vérification par le centre de distribution",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
    },
    {
      icon: Store,
      title: "Pharmacie",
      description: "Mise en vente après authentification complète",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/30",
    },
    {
      icon: User,
      title: "Patient",
      description: "Vérification finale par scan du QR code",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Processus de <span className="text-primary">Traçabilité</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chaque étape est enregistrée sur la blockchain Hedera Hashgraph pour garantir
              une transparence totale
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-8`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card className={`p-6 bg-card/50 backdrop-blur-sm border-2 ${step.borderColor} hover:shadow-[0_0_30px_rgba(0,255,191,0.2)] transition-all animate-in slide-in-from-bottom`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`flex items-start gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center`}>
                          <step.icon className={`h-7 w-7 ${step.color}`} />
                        </div>
                        <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                          <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Center Icon */}
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-card border-4 border-primary shadow-[0_0_30px_rgba(0,255,191,0.4)] flex items-center justify-center z-10 animate-glow">
                    <div className="text-2xl font-bold text-primary">{index + 1}</div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Benefits */}
          <Card className="mt-16 p-8 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4 animate-glow" />
              <h2 className="text-3xl font-bold mb-2">
                Avantages de la Blockchain
              </h2>
              <p className="text-muted-foreground">
                Hedera Hashgraph offre une sécurité et une transparence inégalées
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Immuabilité</h3>
                <p className="text-sm text-muted-foreground">
                  Les données ne peuvent jamais être modifiées ou supprimées
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 mb-4">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Rapidité</h3>
                <p className="text-sm text-muted-foreground">
                  Transactions confirmées en quelques secondes
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Traçabilité</h3>
                <p className="text-sm text-muted-foreground">
                  Suivi complet de la fabrication au patient
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Process;
