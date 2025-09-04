import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Activity, Database, Settings as SettingsIcon, AlertTriangle } from "lucide-react";

export default function Admin() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Helmet>
        <title>Admin | Research Management Portal</title>
        <meta name="description" content="System administration, roles, and configuration overview." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">System Administration</h1>
          <p className="text-muted-foreground">Manage users, system health, and administrative functions.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-green-600">98%</div><p className="text-sm text-muted-foreground">System Health</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">156</div><p className="text-sm text-muted-foreground">Active Users</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">2.3TB</div><p className="text-sm text-muted-foreground">Storage Used</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">99.9%</div><p className="text-sm text-muted-foreground">Uptime</p></CardContent></Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage user accounts, roles, and permissions</p>
              <Button className="w-full">Manage Users</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Monitor system performance and health metrics</p>
              <Button className="w-full">View Health Dashboard</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Backup, restore, and manage system data</p>
              <Button className="w-full">Data Tools</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
