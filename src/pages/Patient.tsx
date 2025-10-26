import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Scan, CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { toast } from "sonner";

const Patient = () => {
  const [medicamentCode, setMedicamentCode] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicamentCode) {
      toast.error("Veuillez entrer un code de médicament");
      return;
    }

    // Simulation de scan
    const isAuthentique = Math.random() > 0.15; // 85% de chances d'être authentique
    setScanResult({
      id: medicamentCode,
      nom: "Paracétamol 500mg",
      fabricant: "PharmaCorp",
      dateExpiration: "2026-12-31",
      statut: isAuthentique ? "Authentique" : "Suspect",
      parcours: [
        { etape: "Fabrication", date: "2025-01-10", lieu: "Usine PharmaCorp, Dakar" },
        { etape: "Transport", date: "2025-01-12", lieu: "Centre de distribution" },
        { etape: "Pharmacie", date: "2025-01-15", lieu: "Pharmacie Centrale, Abidjan" },
      ],
    });
    
    if (isAuthentique) {
      toast.success("✅ Médicament authentique vérifié !");
    } else {
      toast.error("⚠️ Attention - Médicament suspect, consultez un pharmacien");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
              <Users className="h-8 w-8 text-blue-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-blue-500">Espace</span> Patient
            </h1>
            <p className="text-muted-foreground">
              Vérifiez l'authenticité de vos médicaments en quelques secondes
            </p>
          </div>

          <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">Votre sécurité avant tout</h2>
                <p className="text-sm text-muted-foreground">
                  Chaque médicament authentique possède un code unique enregistré sur la blockchain Hedera.
                  Scannez le QR code ou entrez le code manuellement pour vérifier son authenticité.
                </p>
              </div>
            </div>

            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <Label htmlFor="code">Code du médicament ou QR code</Label>
                <Input
                  id="code"
                  placeholder="Ex: HDR-2025-001"
                  className="bg-background"
                  value={medicamentCode}
                  onChange={(e) => setMedicamentCode(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Scan className="mr-2 h-5 w-5" />
                Vérifier le médicament
              </Button>
            </form>
          </Card>

          {scanResult && (
            <Card className={`p-6 backdrop-blur-sm border-2 ${
              scanResult.statut === "Authentique" 
                ? "bg-green-500/10 border-green-500/50" 
                : "bg-red-500/10 border-red-500/50"
            }`}>
              <div className="text-center mb-6">
                {scanResult.statut === "Authentique" ? (
                  <>
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-green-500 mb-2">✅ Médicament Authentique</h3>
                    <p className="text-green-600">Ce médicament est certifié et sûr à utiliser</p>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-red-500 mb-2">⚠️ Médicament Suspect</h3>
                    <p className="text-red-600">Consultez immédiatement un pharmacien</p>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-foreground"><strong>Nom:</strong> {scanResult.nom}</p>
                  <p className="text-foreground"><strong>Code:</strong> {scanResult.id}</p>
                  <p className="text-foreground"><strong>Fabricant:</strong> {scanResult.fabricant}</p>
                  <p className="text-foreground"><strong>Date d'expiration:</strong> {scanResult.dateExpiration}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Parcours du médicament:</h4>
                  <div className="space-y-3">
                    {scanResult.parcours.map((etape: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{etape.etape}</p>
                          <p className="text-sm text-muted-foreground">{etape.date} - {etape.lieu}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20 backdrop-blur-sm">
            <h3 className="font-semibold text-foreground mb-2">💡 Conseil de sécurité</h3>
            <p className="text-sm text-muted-foreground">
              Vérifiez toujours vos médicaments avant utilisation. En cas de doute ou si le statut est "Suspect",
              consultez immédiatement votre pharmacien ou professionnel de santé.
            </p>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              🟣 Powered by <span className="text-blue-500 font-semibold">Hedera</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Patient;
