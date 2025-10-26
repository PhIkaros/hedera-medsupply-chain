import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Search, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Pharmacien = () => {
  const [lotId, setLotId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [historique] = useState([
    { id: "HDR-2025-001", nom: "Paracétamol 500mg", date: "2025-01-20", statut: "Authentique" },
    { id: "HDR-2025-003", nom: "Ibuprofène 400mg", date: "2025-01-18", statut: "Authentique" },
  ]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lotId) {
      toast.error("Veuillez entrer un code de lot");
      return;
    }

    // Simulation de vérification
    const isAuthentique = Math.random() > 0.1; // 90% de chances d'être authentique
    setVerificationResult({
      id: lotId,
      nom: "Médicament X",
      fabricant: "PharmaCorp",
      date: "2025-01-15",
      statut: isAuthentique ? "Authentique" : "Suspect",
      etapes: ["Fabrication", "Transport", "Distribution", "Pharmacie"],
    });
    
    if (isAuthentique) {
      toast.success("Médicament authentifié avec succès !");
    } else {
      toast.error("⚠️ Anomalie détectée - Médicament suspect");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <Heart className="h-8 w-8 text-green-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-green-500">Espace</span> Pharmacien
            </h1>
            <p className="text-muted-foreground">
              Vérifiez l'authenticité des médicaments reçus
            </p>
          </div>

          <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-xl font-bold mb-4 text-green-500">Vérifier un médicament</h2>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <Label htmlFor="lotId">Code du lot ou ID Hedera</Label>
                <Input
                  id="lotId"
                  placeholder="Ex: HDR-2025-001"
                  className="bg-background"
                  value={lotId}
                  onChange={(e) => setLotId(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Search className="mr-2 h-5 w-5" />
                Vérifier l'authenticité
              </Button>
            </form>
          </Card>

          {verificationResult && (
            <Card className={`p-6 mb-8 backdrop-blur-sm border-2 ${
              verificationResult.statut === "Authentique" 
                ? "bg-green-500/10 border-green-500/50" 
                : "bg-red-500/10 border-red-500/50"
            }`}>
              <div className="flex items-start gap-4 mb-4">
                {verificationResult.statut === "Authentique" ? (
                  <CheckCircle className="h-10 w-10 text-green-500" />
                ) : (
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                )}
                <div>
                  <h3 className={`text-2xl font-bold ${
                    verificationResult.statut === "Authentique" ? "text-green-500" : "text-red-500"
                  }`}>
                    {verificationResult.statut === "Authentique" ? "✅ Médicament Authentique" : "⚠️ Médicament Suspect"}
                  </h3>
                  <p className="text-muted-foreground">Code: {verificationResult.id}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-foreground"><strong>Nom:</strong> {verificationResult.nom}</p>
                <p className="text-foreground"><strong>Fabricant:</strong> {verificationResult.fabricant}</p>
                <p className="text-foreground"><strong>Date:</strong> {verificationResult.date}</p>
                <div className="mt-4">
                  <p className="font-semibold text-foreground mb-2">Parcours sur la blockchain:</p>
                  <div className="flex flex-wrap gap-2">
                    {verificationResult.etapes.map((etape: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                        {etape}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-xl font-bold mb-4 text-green-500">Historique des vérifications</h2>
            <div className="space-y-4">
              {historique.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-background/50 rounded-lg border border-border flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.nom}</p>
                    <p className="text-sm text-muted-foreground">Code: {item.id}</p>
                    <p className="text-sm text-muted-foreground">Vérifié le: {item.date}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              🟣 Powered by <span className="text-green-500 font-semibold">Hedera</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pharmacien;
