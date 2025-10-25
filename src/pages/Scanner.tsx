import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scan, CheckCircle, AlertTriangle, Package } from "lucide-react";
import { toast } from "sonner";

const Scanner = () => {
  const [scannedId, setScannedId] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);

  const mockDatabase: Record<string, any> = {
    "0.0.123456": {
      name: "Paracétamol 500mg",
      batch: "LOT-2025-001",
      manufacturer: "PharmaCorp",
      date: "2025-01-15",
      status: "authentique",
      location: "Pharmacie Centrale, Dakar",
    },
    "0.0.123457": {
      name: "Amoxicilline 250mg",
      batch: "LOT-2025-002",
      manufacturer: "MediLab",
      date: "2025-01-14",
      status: "en-transit",
      location: "En route vers Abidjan",
    },
    "0.0.123458": {
      name: "Ibuprofène 400mg",
      batch: "LOT-2025-003",
      manufacturer: "HealthPlus",
      date: "2025-01-13",
      status: "suspect",
      location: "Localisation inconnue",
    },
  };

  const handleScan = () => {
    if (!scannedId.trim()) {
      toast.error("Veuillez entrer un ID Hedera");
      return;
    }

    const result = mockDatabase[scannedId];
    
    if (result) {
      setScanResult(result);
      if (result.status === "authentique") {
        toast.success("✅ Médicament authentique vérifié");
      } else if (result.status === "suspect") {
        toast.error("⚠️ Médicament suspect détecté", {
          description: "Ne pas utiliser ce médicament",
        });
      } else {
        toast("📦 Médicament en transit", {
          description: "Vérification en cours",
        });
      }
    } else {
      toast.error("❌ ID Hedera non trouvé", {
        description: "Ce médicament n'est pas enregistré",
      });
      setScanResult(null);
    }
  };

  const handleSimulateScan = (id: string) => {
    setScannedId(id);
    setTimeout(() => {
      const result = mockDatabase[id];
      setScanResult(result);
      if (result.status === "authentique") {
        toast.success("✅ Scan réussi - Médicament authentique");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-glow">
              <Scan className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Scanner un <span className="text-primary">QR Code</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Vérifiez l'authenticité d'un médicament en scannant son QR code ou en entrant son ID Hedera
            </p>
          </div>

          {/* Scanner Card */}
          <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">ID Hedera</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: 0.0.123456"
                    value={scannedId}
                    onChange={(e) => setScannedId(e.target.value)}
                    className="bg-background"
                    onKeyPress={(e) => e.key === "Enter" && handleScan()}
                  />
                  <Button 
                    onClick={handleScan}
                    className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,191,0.3)]"
                  >
                    <Scan className="h-5 w-5 mr-2" />
                    Scanner
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Exemples à tester:</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSimulateScan("0.0.123456")}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    0.0.123456 (Authentique)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSimulateScan("0.0.123457")}
                    className="border-secondary/30 hover:bg-secondary/10"
                  >
                    0.0.123457 (En transit)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSimulateScan("0.0.123458")}
                    className="border-destructive/30 hover:bg-destructive/10"
                  >
                    0.0.123458 (Suspect)
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          {scanResult && (
            <Card className={`p-8 bg-card/50 backdrop-blur-sm border-2 animate-in slide-in-from-bottom ${
              scanResult.status === "authentique" 
                ? "border-primary/50 shadow-[0_0_30px_rgba(0,255,191,0.2)]" 
                : scanResult.status === "suspect"
                ? "border-destructive/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                : "border-secondary/50"
            }`}>
              <div className="flex items-start gap-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                  scanResult.status === "authentique" 
                    ? "bg-primary/20" 
                    : scanResult.status === "suspect"
                    ? "bg-destructive/20"
                    : "bg-secondary/20"
                }`}>
                  {scanResult.status === "authentique" ? (
                    <CheckCircle className="h-8 w-8 text-primary" />
                  ) : scanResult.status === "suspect" ? (
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  ) : (
                    <Package className="h-8 w-8 text-secondary" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold">{scanResult.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      scanResult.status === "authentique"
                        ? "bg-primary/20 text-primary"
                        : scanResult.status === "suspect"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-secondary/20 text-secondary"
                    }`}>
                      {scanResult.status === "authentique" ? "✅ Authentique" : 
                       scanResult.status === "suspect" ? "⚠️ Suspect" : "📦 En transit"}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Numéro de lot</p>
                      <p className="font-semibold">{scanResult.batch}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Fabricant</p>
                      <p className="font-semibold">{scanResult.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Date de fabrication</p>
                      <p className="font-semibold">{new Date(scanResult.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Localisation</p>
                      <p className="font-semibold">{scanResult.location}</p>
                    </div>
                  </div>

                  {scanResult.status === "suspect" && (
                    <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-destructive font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Alerte de sécurité
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Ce médicament a été signalé comme suspect par notre système d'IA. 
                        Veuillez ne pas l'utiliser et contacter les autorités.
                      </p>
                    </div>
                  )}

                  {scanResult.status === "authentique" && (
                    <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                      <p className="text-primary font-semibold flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Vérifié par Hedera Hashgraph
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Ce médicament a été authentifié et vérifié sur la blockchain. Vous pouvez l'utiliser en toute sécurité.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Scanner;
