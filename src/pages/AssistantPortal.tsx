import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, LayoutDashboard, Megaphone, CalendarDays, Flag, BarChart3, ExternalLink } from "lucide-react";

export default function AssistantPortal() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <Helmet>
        <title>Assistant Researcher Portal | Research Management Portal</title>
        <meta name="description" content="Assistant researcher workspace with dashboard, calls, calendar, milestones, and reports." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Assistant Researcher</h1>
          <p className="text-muted-foreground">Quick access to calls, calendar, milestones, and reports.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <Button variant={activeTab === "dashboard" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("dashboard")}>
              <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
            </Button>
            <Button variant={activeTab === "calls" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("calls")}>
              <Megaphone className="h-4 w-4 mr-2" /> Calls
            </Button>
            <Button variant={activeTab === "calendar" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("calendar")}>
              <CalendarIcon className="h-4 w-4 mr-2" /> Calendar
            </Button>
            <Button variant={activeTab === "milestones" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("milestones")}>
              <Flag className="h-4 w-4 mr-2" /> Milestones
            </Button>
            <Button variant={activeTab === "reports" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("reports")}>
              <BarChart3 className="h-4 w-4 mr-2" /> Reports
            </Button>
          </aside>

          {/* Content */}
          <section className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="hidden" aria-hidden="true">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Dashboard */}
              <TabsContent value="dashboard">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-sm text-muted-foreground">Open Calls of Interest</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-sm text-muted-foreground">Upcoming Deadlines</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-sm text-muted-foreground">Milestones this Week</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Calls */}
              <TabsContent value="calls">
                <Card>
                  <CardHeader>
                    <CardTitle>Funding Calls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Browse current calls and assist with applications.</p>
                    <div className="flex gap-2">
                      <Button onClick={() => (window.location.href = "/calls")}>
                        <ExternalLink className="h-4 w-4 mr-2" /> View Calls Page
                      </Button>
                      <Button variant="outline">Track a Call</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Calendar */}
              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Deadlines, meetings, and milestones.</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="p-3 rounded border"><Badge variant="secondary" className="mr-2">Due</Badge> Draft Review — Oct 20</div>
                      <div className="p-3 rounded border"><Badge variant="secondary" className="mr-2">Meeting</Badge> PI Sync — Oct 22</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Milestones */}
              <TabsContent value="milestones">
                <Card>
                  <CardHeader>
                    <CardTitle>Milestones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 rounded border">
                        <div className="font-medium">IRB Submission</div>
                        <div className="text-xs text-muted-foreground">Due Oct 25</div>
                      </div>
                      <div className="p-3 rounded border">
                        <div className="font-medium">Budget Draft</div>
                        <div className="text-xs text-muted-foreground">Due Nov 3</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Add Quick Milestone</Label>
                        <Input placeholder="e.g., Secure Letters of Support" />
                      </div>
                      <div className="flex items-end"><Button>Add</Button></div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports */}
              <TabsContent value="reports">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-sm text-muted-foreground">Reports Available</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">Last Week</div>
                      <p className="text-sm text-muted-foreground">Last Activity</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">OK</div>
                      <p className="text-sm text-muted-foreground">Compliance Status</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Quick Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start"><BarChart3 className="h-4 w-4 mr-2" /> Weekly Progress Summary</Button>
                    <Button variant="outline" className="w-full justify-start"><BarChart3 className="h-4 w-4 mr-2" /> Upcoming Deadlines</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </>
  );
}
