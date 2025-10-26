import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Distributeur = () => {
  const [lots, setLots] = useState([
    { id: "HDR-2025-001", nom: "Paracétamol 500mg", statut: "En transit", etape: "Entrepôt principal" },
    { id: "HDR-2025-002", nom: "Amoxicilline 250mg", statut: "Livré", etape: "Pharmacie centrale" },
  ]);

  const handleUpdateStatut = (id: string) => {
    setLots(
      lots.map((lot) =>
        lot.id === id
          ? { ...lot, statut: "Livré", etape: "Destination finale" }
          : lot
      )
    );
    toast.success("Statut mis à jour avec succès !");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
              <Truck className="h-8 w-8 text-secondary animate-glow" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-secondary">Espace</span> Distributeur
            </h1>
            <p className="text-muted-foreground">
              Suivez et gérez les livraisons de médicaments
            </p>
          </div>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-xl font-bold mb-4 text-secondary">Lots en cours de livraison</h2>
            <div className="space-y-4">
              {lots.map((lot) => (
                <div
                  key={lot.id}
                  className="p-4 bg-background/50 rounded-lg border border-border"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground">{lot.nom}</p>
                      <p className="text-sm text-muted-foreground">Code: {lot.id}</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <p className="text-sm text-muted-foreground">{lot.etape}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {lot.statut === "Livré" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Truck className="h-4 w-4 text-yellow-500" />
                        )}
                        <p className={`text-sm font-semibold ${
                          lot.statut === "Livré" ? "text-green-500" : "text-yellow-500"
                        }`}>
                          {lot.statut}
                        </p>
                      </div>
                    </div>
                    {lot.statut !== "Livré" && (
                      <Button
                        variant="outline"
                        className="border-secondary text-secondary hover:bg-secondary/10"
                        onClick={() => handleUpdateStatut(lot.id)}
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Marquer comme livré
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-6 p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <Truck className="h-8 w-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Traçabilité en temps réel</h3>
                <p className="text-sm text-muted-foreground">
                  Chaque mise à jour est enregistrée sur la blockchain Hedera pour garantir la transparence
                  et l'authenticité de la chaîne d'approvisionnement.
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              🟣 Powered by <span className="text-secondary font-semibold">Hedera</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Distributeur;
