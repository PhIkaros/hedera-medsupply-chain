import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Shield, AlertTriangle, Activity } from "lucide-react";

const Statistics = () => {
  const batchData = [
    { month: "Jan", authentique: 245, suspect: 12, enTransit: 89 },
    { month: "Fév", authentique: 312, suspect: 8, enTransit: 104 },
    { month: "Mar", authentique: 389, suspect: 15, enTransit: 125 },
    { month: "Avr", authentique: 427, suspect: 6, enTransit: 142 },
    { month: "Mai", authentique: 501, suspect: 18, enTransit: 167 },
  ];

  const anomalyData = [
    { name: "Localisation incohérente", value: 35 },
    { name: "Lot dupliqué", value: 28 },
    { name: "Fabricant suspect", value: 22 },
    { name: "Date invalide", value: 15 },
  ];

  const COLORS = ["hsl(165 100% 50%)", "hsl(185 100% 49%)", "hsl(222 20% 60%)", "hsl(0 84% 60%)"];

  const stats = [
    {
      title: "Lots suivis",
      value: "2,045",
      change: "+12.5%",
      icon: Activity,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Taux d'authenticité",
      value: "96.8%",
      change: "+2.1%",
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Anomalies détectées",
      value: "59",
      change: "-8.3%",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Transactions/jour",
      value: "847",
      change: "+18.2%",
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-primary">Statistiques</span> et Analyses
            </h1>
            <p className="text-muted-foreground">
              Tableau de bord des métriques de traçabilité
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-bold mb-6">Évolution mensuelle des lots</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={batchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="authentique" fill="hsl(165 100% 50%)" name="Authentique" />
                  <Bar dataKey="enTransit" fill="hsl(185 100% 49%)" name="En transit" />
                  <Bar dataKey="suspect" fill="hsl(0 84% 60%)" name="Suspect" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie Chart */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-bold mb-6">Types d'anomalies détectées</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={anomalyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {anomalyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Line Chart */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border lg:col-span-2">
              <h3 className="text-xl font-bold mb-6">Tendance de détection d'anomalies</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={batchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="authentique" 
                    stroke="hsl(165 100% 50%)" 
                    strokeWidth={2}
                    name="Authentique"
                    dot={{ fill: "hsl(165 100% 50%)", r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="suspect" 
                    stroke="hsl(0 84% 60%)" 
                    strokeWidth={2}
                    name="Suspect"
                    dot={{ fill: "hsl(0 84% 60%)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="mt-6 p-8 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary animate-glow" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Analyse IA</h3>
                <p className="text-muted-foreground mb-4">
                  Notre système d'intelligence artificielle analyse en temps réel les données de la blockchain
                  pour détecter les anomalies et prévenir les contrefaçons.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Précision de détection</p>
                    <p className="text-2xl font-bold text-primary">98.3%</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Temps de réponse</p>
                    <p className="text-2xl font-bold text-secondary">2.1s</p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Analyses quotidiennes</p>
                    <p className="text-2xl font-bold text-primary">1,247</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
