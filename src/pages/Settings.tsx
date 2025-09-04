import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Settings as SettingsIcon, Mail, Globe } from "lucide-react";

export default function Settings() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Helmet>
        <title>Settings | Research Management Portal</title>
        <meta name="description" content="Configure organization preferences and app settings." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Configure organization settings and system preferences.</p>
        </div>

        <Tabs defaultValue="organization" className="space-y-4">
          <TabsList>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" defaultValue="ISSER Research Institute" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-code">Organization Code</Label>
                    <Input id="org-code" defaultValue="ISSER" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-address">Address</Label>
                    <Input id="org-address" defaultValue="University of Ghana, Legon" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-website">Website</Label>
                    <Input id="org-website" defaultValue="https://isser.ug.edu.gh" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="GMT (Ghana)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Input id="currency" defaultValue="USD" />
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Email Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Configure email notifications and templates</p>
                  <Button variant="outline" className="w-full">Configure Email</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>API Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Manage third-party API connections</p>
                  <Button variant="outline" className="w-full">Manage APIs</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Application Submitted</Label>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Milestone Due</Label>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Budget Alert</Label>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </div>
                <Button>Update Notifications</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
