import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Plus, QrCode } from "lucide-react";
import { toast } from "sonner";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const Fabricant = () => {
  const [lots, setLots] = useState([
    { id: "HDR-2025-001", nom: "Paracétamol 500mg", fabricant: "PharmaCorp", date: "2025-01-15" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  const [newLot, setNewLot] = useState({
    nom: "",
    fabricant: "",
    date: "",
  });

  const handleAddLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLot.nom || !newLot.fabricant || !newLot.date) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const lotId = `HDR-${new Date().getFullYear()}-${String(lots.length + 1).padStart(3, "0")}`;
    setLots([...lots, { id: lotId, ...newLot }]);
    toast.success("Lot enregistré avec succès !");
    setNewLot({ nom: "", fabricant: "", date: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Package className="h-8 w-8 text-primary animate-glow" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-primary">Espace</span> Fabricant
            </h1>
            <p className="text-muted-foreground">
              Enregistrez et gérez vos lots de médicaments
            </p>
          </div>

          <div className="mb-6">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,191,0.3)]"
            >
              <Plus className="mr-2 h-5 w-5" />
              Ajouter un nouveau lot
            </Button>
          </div>

          {showForm && (
            <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border">
              <h2 className="text-xl font-bold mb-4 text-primary">Nouveau lot de médicaments</h2>
              <form onSubmit={handleAddLot} className="space-y-4">
                <div>
                  <Label htmlFor="nom">Nom du produit</Label>
                  <Input
                    id="nom"
                    placeholder="Ex: Paracétamol 500mg"
                    className="bg-background"
                    value={newLot.nom}
                    onChange={(e) => setNewLot({ ...newLot, nom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="fabricant">Fabricant</Label>
                  <Input
                    id="fabricant"
                    placeholder="Ex: PharmaCorp"
                    className="bg-background"
                    value={newLot.fabricant}
                    onChange={(e) => setNewLot({ ...newLot, fabricant: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date de fabrication</Label>
                  <Input
                    id="date"
                    type="date"
                    className="bg-background"
                    value={newLot.date}
                    onChange={(e) => setNewLot({ ...newLot, date: e.target.value })}
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Enregistrer le lot
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-xl font-bold mb-4 text-primary">Mes lots enregistrés</h2>
            <div className="space-y-4">
              {lots.map((lot) => (
                <div
                  key={lot.id}
                  className="p-4 bg-background/50 rounded-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-foreground">{lot.nom}</p>
                    <p className="text-sm text-muted-foreground">Code: {lot.id}</p>
                    <p className="text-sm text-muted-foreground">Fabricant: {lot.fabricant}</p>
                    <p className="text-sm text-muted-foreground">Date: {lot.date}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => setSelectedLot(selectedLot === lot.id ? null : lot.id)}
                  >
                    <QrCode className="mr-2 h-5 w-5" />
                    {selectedLot === lot.id ? "Masquer QR" : "Afficher QR"}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {selectedLot && (
            <Card className="mt-6 p-6 bg-card/50 backdrop-blur-sm border-border text-center">
              <h3 className="text-xl font-bold mb-4 text-primary">QR Code du lot</h3>
              <QRCodeGenerator value={selectedLot} size={200} />
            </Card>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              🟣 Powered by <span className="text-primary font-semibold">Hedera</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Fabricant;
