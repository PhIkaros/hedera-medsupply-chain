import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, PackageCheck, AlertTriangle, Clock, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import QRCodeGenerator from "@/components/QRCodeGenerator";

interface Medicine {
  id: string;
  name: string;
  batch: string;
  manufacturer: string;
  date: string;
  status: "authentique" | "en-transit" | "suspect";
  hederaId: string;
}

const Dashboard = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "1",
      name: "Paracétamol 500mg",
      batch: "LOT-2025-001",
      manufacturer: "PharmaCorp",
      date: "2025-01-15",
      status: "authentique",
      hederaId: "0.0.123456",
    },
    {
      id: "2",
      name: "Amoxicilline 250mg",
      batch: "LOT-2025-002",
      manufacturer: "MediLab",
      date: "2025-01-14",
      status: "en-transit",
      hederaId: "0.0.123457",
    },
    {
      id: "3",
      name: "Ibuprofène 400mg",
      batch: "LOT-2025-003",
      manufacturer: "HealthPlus",
      date: "2025-01-13",
      status: "suspect",
      hederaId: "0.0.123458",
    },
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    batch: "",
    manufacturer: "",
    date: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.batch || !newMedicine.manufacturer || !newMedicine.date) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Simulated AI anomaly detection
    const hasAnomaly = Math.random() > 0.7;
    const newId = Date.now().toString();
    const hederaId = `0.0.${Math.floor(Math.random() * 999999)}`;

    const medicine: Medicine = {
      id: newId,
      ...newMedicine,
      status: hasAnomaly ? "suspect" : "authentique",
      hederaId,
    };

    setMedicines([medicine, ...medicines]);
    
    if (hasAnomaly) {
      toast.error("⚠️ Anomalie détectée par l'IA", {
        description: "Incohérence de localisation ou lot dupliqué possible",
      });
    } else {
      toast.success("✅ Médicament ajouté avec succès", {
        description: `Transaction blockchain confirmée: ${hederaId}`,
      });
    }

    setNewMedicine({ name: "", batch: "", manufacturer: "", date: "" });
    setIsDialogOpen(false);
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Medicine["status"]) => {
    switch (status) {
      case "authentique":
        return "bg-primary/20 text-primary border-primary/50";
      case "en-transit":
        return "bg-secondary/20 text-secondary border-secondary/50";
      case "suspect":
        return "bg-destructive/20 text-destructive border-destructive/50";
    }
  };

  const getStatusIcon = (status: Medicine["status"]) => {
    switch (status) {
      case "authentique":
        return <PackageCheck className="h-4 w-4" />;
      case "en-transit":
        return <Clock className="h-4 w-4" />;
      case "suspect":
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const stats = {
    total: medicines.length,
    authentique: medicines.filter((m) => m.status === "authentique").length,
    suspect: medicines.filter((m) => m.status === "suspect").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Dashboard <span className="text-primary">Administrateur</span>
            </h1>
            <p className="text-muted-foreground">Gestion des lots de médicaments</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de lots</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <PackageCheck className="h-12 w-12 text-primary animate-glow" />
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Authentiques</p>
                  <p className="text-3xl font-bold text-primary">{stats.authentique}</p>
                </div>
                <PackageCheck className="h-12 w-12 text-primary" />
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-destructive/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Suspects</p>
                  <p className="text-3xl font-bold text-destructive">{stats.suspect}</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </Card>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un médicament..."
                className="pl-10 bg-card/50 backdrop-blur-sm border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,191,0.3)]">
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter un lot
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau lot</DialogTitle>
                  <DialogDescription>
                    L'IA analysera automatiquement les informations pour détecter les anomalies
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Nom du médicament</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Paracétamol 500mg"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="batch">Numéro de lot</Label>
                    <Input
                      id="batch"
                      placeholder="Ex: LOT-2025-001"
                      value={newMedicine.batch}
                      onChange={(e) => setNewMedicine({ ...newMedicine, batch: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="manufacturer">Fabricant</Label>
                    <Input
                      id="manufacturer"
                      placeholder="Ex: PharmaCorp"
                      value={newMedicine.manufacturer}
                      onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date de fabrication</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newMedicine.date}
                      onChange={(e) => setNewMedicine({ ...newMedicine, date: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAddMedicine}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Ajouter et analyser
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Medicines List */}
          <div className="grid gap-4">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{medicine.name}</h3>
                        <p className="text-sm text-muted-foreground">Lot: {medicine.batch}</p>
                      </div>
                      <Badge className={getStatusColor(medicine.status)}>
                        {getStatusIcon(medicine.status)}
                        <span className="ml-1 capitalize">{medicine.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Fabricant:</span> {medicine.manufacturer}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Date:</span> {new Date(medicine.date).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-primary">Hedera ID:</span> {medicine.hederaId}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <QRCodeGenerator value={medicine.hederaId} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredMedicines.length === 0 && (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
              <PackageCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Aucun médicament trouvé</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
