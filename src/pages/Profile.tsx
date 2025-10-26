import { useState, useContext } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Shield,
  Activity,
  Edit,
  Building,
  Truck,
  MapPin,
  Package,
} from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/App";

const Profile = () => {
  const { userRole, userName, userEmail, userOrganization } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userName || "Utilisateur",
    email: userEmail || "user@example.com",
    role: userRole || "Administrateur",
    organization: userOrganization || "",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profil mis à jour avec succès");
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const activities = [
    {
      action: "Ajout de lot",
      details: "Paracétamol 500mg - LOT-2025-001",
      time: "Il y a 2 heures",
      status: "success",
    },
    {
      action: "Scan QR code",
      details: "Amoxicilline 250mg vérifié",
      time: "Il y a 5 heures",
      status: "success",
    },
    {
      action: "Anomalie détectée",
      details: "Ibuprofène 400mg - ID suspect",
      time: "Il y a 1 jour",
      status: "warning",
    },
    {
      action: "Modification de lot",
      details: "Mise à jour statut LOT-2025-002",
      time: "Il y a 2 jours",
      status: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Mon <span className="text-primary">Profil</span>
            </h1>
            <p className="text-muted-foreground">Gérez vos informations personnelles</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-2 p-8 bg-card/50 backdrop-blur-sm border-border">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary shadow-[0_0_20px_rgba(0,255,191,0.3)]">
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                      {profile.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-muted-foreground">{profile.role}</p>
                  </div>
                </div>

                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedProfile.name : profile.name}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, name: e.target.value })
                    }
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedProfile.email : profile.email}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Input id="role" value={profile.role} disabled className="bg-background" />
                </div>

                <div>
                  <Label htmlFor="organization">
                    {userRole === "Fabricant"
                      ? "Entreprise"
                      : userRole === "Distributeur"
                      ? "Société de transport"
                      : userRole === "Pharmacien"
                      ? "Pharmacie"
                      : "Organisation"}
                  </Label>
                  <Input
                    id="organization"
                    value={isEditing ? editedProfile.organization : profile.organization}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, organization: e.target.value })
                    }
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>

                {userRole === "Pharmacien" && (
                  <div>
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Dakar, Sénégal"
                      disabled={!isEditing}
                      className="bg-background"
                    />
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      Enregistrer
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      Annuler
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Stats Card */}
            <div className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <h3 className="text-lg font-bold mb-4">Statistiques</h3>
                <div className="space-y-4">
                  {/* existing role-specific stats unchanged */}
                </div>
              </Card>

              {/* Activity History — Admin Only */}
              {userRole === "Administrateur" && (
                <Card className="mt-6 p-8 bg-card/50 backdrop-blur-sm border-border">
                  <h3 className="text-xl font-bold mb-6">Historique d'activité</h3>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            activity.status === "success"
                              ? "bg-primary/20"
                              : "bg-destructive/20"
                          }`}
                        >
                          {activity.status === "success" ? (
                            <Activity className="h-5 w-5 text-primary" />
                          ) : (
                            <Shield className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{activity.action}</h4>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <Card className="p-6 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 backdrop-blur-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                    <Shield className="h-6 w-6 text-primary animate-glow" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {userRole === "Fabricant"
                      ? "Fabricant Certifié"
                      : userRole === "Distributeur"
                      ? "Distributeur Vérifié"
                      : userRole === "Pharmacien"
                      ? "Pharmacie Certifiée"
                      : userRole === "Utilisateur"
                      ? "Utilisateur Vérifié"
                      : "Expert Pharmaceutique"}
                  </h3>
                  <p className="text-sm text-muted-foreground">Certifié Hedera</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Powered by Hedera */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
               Powered by <span className="text-primary font-semibold">Hedera</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
