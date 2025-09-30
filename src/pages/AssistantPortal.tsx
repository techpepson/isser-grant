import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar as CalendarIcon,
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Flag,
  BarChart3,
  ExternalLink,
  Building,
  DollarSign,
  Users,
  Clock,
  Bolt,
} from "lucide-react";

export default function AssistantPortal() {
  const canonical = typeof window !== "undefined" ? window.location.href : "";
  const [activeTab, setActiveTab] = useState("dashboard");
  // Helpers
  const daysUntil = (d: string) =>
    Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
  const statusVariant = (s: string) =>
    s === "Active"
      ? "default"
      : s === "Closing Soon"
      ? "destructive"
      : s === "Opening Soon"
      ? "secondary"
      : "outline";

  // Calls dataset (read-only here)
  const calls = [
    {
      id: "NSF-2024-001",
      title: "NSF Research Grant Program",
      funder: "National Science Foundation",
      theme: "Basic Research",
      totalFunding: "$5,000,000",
      maxAward: "$250,000",
      deadline: "2025-11-15",
      status: "Active",
      applications: 45,
    },
    {
      id: "NIH-2024-002",
      title: "Biomedical Research Excellence",
      funder: "NIH",
      theme: "Health & Medicine",
      totalFunding: "$8,000,000",
      maxAward: "$400,000",
      deadline: "2025-10-20",
      status: "Active",
      applications: 32,
    },
    {
      id: "DOE-2024-003",
      title: "Clean Energy Innovation",
      funder: "DOE",
      theme: "Energy & Environment",
      totalFunding: "$10,000,000",
      maxAward: "$500,000",
      deadline: "2025-12-10",
      status: "Active",
      applications: 28,
    },
    {
      id: "EPA-2024-004",
      title: "Environmental Sustainability",
      funder: "EPA",
      theme: "Environment",
      totalFunding: "$3,000,000",
      maxAward: "$150,000",
      deadline: "2025-10-05",
      status: "Closing Soon",
      applications: 67,
    },
    {
      id: "DARPA-2024-005",
      title: "Defense Research Projects",
      funder: "DARPA",
      theme: "Defense & Security",
      totalFunding: "$15,000,000",
      maxAward: "$1,000,000",
      deadline: "2026-01-31",
      status: "Opening Soon",
      applications: 0,
    },
  ];
  const [callSearch, setCallSearch] = useState("");
  const [callStatus, setCallStatus] = useState("");

  const filteredCalls = useMemo(() => {
    const q = callSearch.toLowerCase();
    return calls.filter(
      (c) =>
        (!callStatus || c.status === callStatus) &&
        (!q || `${c.title} ${c.funder} ${c.theme}`.toLowerCase().includes(q))
    );
  }, [calls, callSearch, callStatus]);
  const openCalls = filteredCalls.filter((c) =>
    ["Active", "Closing Soon"].includes(c.status)
  );
  const upcomingCalls = filteredCalls.filter((c) =>
    ["Opening Soon"].includes(c.status)
  );
  const closedCalls = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return filteredCalls.filter((c) => c.deadline < today);
  }, [filteredCalls]);

  // Applications snapshot (visible in Applications tab)
  const applications = [
    {
      id: "APP-001",
      title: "Coastal Ecosystems",
      applicant: "Dr. Sarah Johnson",
      callTitle: "NSF Research Grant Program",
      requested: "$85,000",
      submitted: "2025-09-15",
      deadline: "2025-11-15",
      status: "Under Review",
    },
    {
      id: "APP-002",
      title: "AI Drug Discovery",
      applicant: "Prof. Michael Chen",
      callTitle: "NIH Biomedical Research Excellence",
      requested: "$120,000",
      submitted: "2025-09-12",
      deadline: "2025-10-20",
      status: "Approved",
    },
    {
      id: "APP-003",
      title: "Energy Storage",
      applicant: "Dr. Emily Rodriguez",
      callTitle: "DOE Clean Energy Innovation",
      requested: "$95,000",
      submitted: "2025-09-10",
      deadline: "2025-12-10",
      status: "Needs Revision",
    },
  ];
  const pendingApps = applications.filter((a) =>
    ["Submitted", "Under Review"].includes(a.status)
  );
  const approvedApps = applications.filter((a) => a.status === "Approved");

  // Awards / Projects assigned to assistant
  const awards = [
    {
      id: "AWD-001",
      project: "AI-Driven Drug Discovery Platform",
      pi: "Prof. Michael Chen",
      call: "NIH Biomedical Research Excellence",
      amount: "$120,000",
      progress: 25,
      next: "Phase I Testing Complete",
      due: "2026-06-30",
      assigned: true,
      status: "Active",
    },
    {
      id: "AWD-002",
      project: "Climate Change Impact on Coastal Ecosystems",
      pi: "Dr. Sarah Johnson",
      call: "NSF Climate Research Initiative",
      amount: "$85,000",
      progress: 65,
      next: "Final Data Collection",
      due: "2026-12-15",
      assigned: true,
      status: "Active",
    },
    {
      id: "AWD-003",
      project: "Renewable Energy Storage Solutions",
      pi: "Dr. Emily Rodriguez",
      call: "DOE Clean Energy Initiative",
      amount: "$95,000",
      progress: 45,
      next: "Prototype Testing",
      due: "2026-09-30",
      assigned: false,
      status: "Active",
    },
  ];
  const assigned = awards.filter((a) => a.assigned);

  // Milestones across projects
  const milestones = [
    {
      id: "M-01",
      title: "IRB Submission",
      project: "AWD-001",
      due: "2025-10-25",
    },
    {
      id: "M-02",
      title: "Budget Draft",
      project: "AWD-002",
      due: "2025-11-03",
    },
    {
      id: "M-03",
      title: "Prototype Test Report",
      project: "AWD-003",
      due: "2025-12-12",
    },
  ];

  // Research events: from calls/applications + a few meetings
  const events = useMemo(() => {
    const e1 = calls.map((c) => ({
      type: "Deadline",
      label: `${c.title} due`,
      date: c.deadline,
    }));
    const e2 = applications.map((a) => ({
      type: "Application",
      label: `${a.title} review deadline`,
      date: a.deadline,
    }));
    const meetings = [
      { type: "Meeting", label: "PI Sync", date: "2025-10-22" },
      { type: "Meeting", label: "Budget Review", date: "2025-10-25" },
    ];
    return [...e1, ...e2, ...meetings].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [calls, applications]);

  return (
    <>
      <Helmet>
        <title>Assistant Researcher Portal | Research Management Portal</title>
        <meta
          name="description"
          content="Assistant researcher workspace with dashboard, calls, calendar, milestones, and reports."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Assistant Researcher
          </h1>
          <p className="text-muted-foreground">
            Quick access to calls, calendar, milestones, and reports.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 w-full">
            <Sidebar collapsible="none" className="w-full border rounded">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Assistant Researcher</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "dashboard"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("dashboard")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "calls"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("calls")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <Megaphone className="h-4 w-4" />
                            <span>Calls</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "applications"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("applications")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <CalendarDays className="h-4 w-4" />
                            <span>Applications</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "calendar"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("calendar")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <CalendarIcon className="h-4 w-4" />
                            <span>Calendar</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "milestones"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("milestones")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <Flag className="h-4 w-4" />
                            <span>Milestones</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "reports"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("reports")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <BarChart3 className="h-4 w-4" />
                            <span>Reports</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </aside>

          {/* Content */}
          <section className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="hidden" aria-hidden="true">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Dashboard */}
              <TabsContent value="dashboard">
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">
                        {openCalls.length}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Open Calls
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">
                        {applications.length}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Applications
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">
                        {assigned.length}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Assigned Projects
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">{events.length}</div>
                      <p className="text-sm text-muted-foreground">
                        Upcoming Items
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assigned Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {assigned.map((a) => (
                        <div key={a.id} className="p-3 rounded border">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{a.project}</div>
                              <div className="text-xs text-muted-foreground">
                                PI: {a.pi}
                              </div>
                            </div>
                            <Badge variant="secondary">{a.status}</Badge>
                          </div>
                          {/* Simple progress bar */}
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{a.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded">
                              <div
                                className="h-2 bg-primary rounded"
                                style={{ width: `${a.progress}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                            <CalendarIcon className="h-3 w-3" /> Next: {a.next}{" "}
                            • Due {a.due}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("calls")}
                      >
                        <Megaphone className="h-4 w-4 mr-2" /> Find Calls
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("applications")}
                      >
                        <CalendarDays className="h-4 w-4 mr-2" /> View
                        Applications
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("milestones")}
                      >
                        <Flag className="h-4 w-4 mr-2" /> Track Milestones
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => (window.location.href = "/awards")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" /> Open Awards
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Calls */}
              {/* Calls */}
              <TabsContent value="calls">
                <Card>
                  <CardHeader>
                    <CardTitle>Funding Calls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search + Status Filter */}
                    <div className="flex flex-col md:flex-row gap-2 items-start">
                      <div className="flex-1">
                        <Label className="text-sm font-medium mb-2 block">
                          Search
                        </Label>
                        <Input
                          placeholder="Search by title, funder, theme"
                          value={callSearch}
                          onChange={(e) => setCallSearch(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-60">
                        <Label className="text-sm font-medium mb-2 block">
                          Status
                        </Label>
                        <select
                          className="w-full h-10 rounded border px-3 text-sm bg-background"
                          value={callStatus}
                          onChange={(e) => setCallStatus(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="Active">Active</option>
                          <option value="Closing Soon">Closing Soon</option>
                          <option value="Opening Soon">Opening Soon</option>
                        </select>
                      </div>
                    </div>

                    {/* KPIs */}
                    <div className="grid gap-4 md:grid-cols-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {openCalls.length}
                          </div>
                          <p className="text-sm text-muted-foreground">Open</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {upcomingCalls.length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Upcoming
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {closedCalls.length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Closed
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {applications.length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Applications
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Open */}
                    <div className="space-y-3">
                      {openCalls.map((c) => (
                        <Card key={c.id} className="hover:shadow-sm">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-lg">
                                  {c.title}
                                </CardTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Building className="h-4 w-4" />
                                    {c.funder}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    Max {c.maxAward}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    {c.applications} apps
                                  </span>
                                </div>
                              </div>
                              <div className="text-right text-sm space-y-1">
                                <Badge variant={statusVariant(c.status)}>
                                  {c.status}
                                </Badge>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4" />
                                  Due {c.deadline}
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {daysUntil(c.deadline)} days left
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => (window.location.href = "/calls")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Upcoming */}
                    <div className="space-y-3">
                      {upcomingCalls.map((c) => (
                        <Card key={c.id} className="hover:shadow-sm">
                          <CardHeader className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                {c.title}
                              </CardTitle>
                              <div className="text-sm text-muted-foreground">
                                {c.funder} • Max {c.maxAward}
                              </div>
                            </div>
                            <Badge variant={statusVariant(c.status)}>
                              {c.status}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <Button
                              variant="outline"
                              onClick={() => (window.location.href = "/calls")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Learn More
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Closed */}
                    <div className="space-y-3">
                      {closedCalls.length === 0 && (
                        <div className="text-sm text-muted-foreground">
                          No closed calls.
                        </div>
                      )}
                      {closedCalls.map((c) => (
                        <Card key={c.id}>
                          <CardHeader className="flex items-center justify-between">
                            <CardTitle className="text-lg">{c.title}</CardTitle>
                            <Badge variant="outline">Closed</Badge>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>

                    {/* Research Events & Deadlines */}
                    <Card className="border-dashed">
                      <CardHeader>
                        <CardTitle>Research Events & Deadlines</CardTitle>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-2 gap-2 text-sm">
                        {events.slice(0, 10).map((e, i) => (
                          <div
                            key={i}
                            className="p-3 rounded border flex items-center gap-2"
                          >
                            <Badge variant="secondary">{e.type}</Badge>{" "}
                            {e.label} — {e.date}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Applications */}
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {applications.length}
                          </div>
                          <p className="text-sm text-muted-foreground">Total</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {pendingApps.length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Pending Review
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {approvedApps.length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Approved
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-3">
                      {applications.map((a) => (
                        <div key={a.id} className="p-3 rounded border">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="font-medium">{a.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {a.applicant} • {a.callTitle}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  {a.requested}
                                </span>
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="h-3 w-3" />
                                  Deadline: {a.deadline} (
                                  {daysUntil(a.deadline)}d)
                                </span>
                              </div>
                            </div>
                            <Badge
                              variant={
                                a.status === "Approved"
                                  ? "default"
                                  : a.status === "Needs Revision"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {a.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
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
                    <p className="text-sm text-muted-foreground">
                      Deadlines for calls, application reviews, and upcoming
                      meetings.
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      {events.map((e, i) => (
                        <div
                          key={i}
                          className="p-3 rounded border flex items-center gap-2"
                        >
                          <Badge variant="secondary">{e.type}</Badge> {e.label}{" "}
                          — {e.date}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Milestones */}
              {/* Milestones */}
              <TabsContent value="milestones">
                <Card>
                  <CardHeader>
                    <CardTitle>Milestones & Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {awards.filter((a) => a.status === "Active").length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Active Projects
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {assigned.length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Assigned
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold">
                            {milestones.length}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Milestones Tracked
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      {awards.map((a) => (
                        <Card key={a.id} className="hover:shadow-sm">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-lg">
                                  {a.project}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground">
                                  PI: {a.pi} • {a.call}
                                </div>
                              </div>
                              <Badge
                                variant={
                                  a.status === "Active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {a.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{a.progress}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded">
                                <div
                                  className="h-2 bg-primary rounded"
                                  style={{ width: `${a.progress}%` }}
                                />
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Next: {a.next} • Due {a.due}
                              </div>
                            </div>
                            {/* Related milestones for this project */}
                            <div className="mt-3 space-y-2">
                              {milestones.filter((m) => m.project === a.id)
                                .length === 0 ? (
                                <div className="text-xs text-muted-foreground">
                                  No milestones recorded for this project.
                                </div>
                              ) : (
                                milestones
                                  .filter((m) => m.project === a.id)
                                  .map((m) => (
                                    <div
                                      key={m.id}
                                      className="text-sm p-2 rounded border flex items-center justify-between"
                                    >
                                      <div>{m.title}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {m.due}
                                      </div>
                                    </div>
                                  ))
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
                      <p className="text-sm text-muted-foreground">
                        Reports Available
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">Last Week</div>
                      <p className="text-sm text-muted-foreground">
                        Last Activity
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">OK</div>
                      <p className="text-sm text-muted-foreground">
                        Compliance Status
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Quick Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" /> Weekly Progress
                      Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" /> Upcoming Deadlines
                    </Button>
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
