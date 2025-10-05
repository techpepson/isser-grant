import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  FilePlus2,
  Award as AwardIcon,
  FileText,
  DollarSign,
  BarChart3,
  CalendarDays,
  Flag,
  Users,
  Activity,
  Clock,
  CheckCircle,
} from "lucide-react";
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

export default function ResearcherPortal() {
  const canonical = typeof window !== "undefined" ? window.location.href : "";
  const [activeTab, setActiveTab] = useState("dashboard");
  // Calls data for Apply page and Calendar
  const calls = useMemo(
    () => [
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
    ],
    []
  );

  const [callSearch, setCallSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredCalls = useMemo(() => {
    const q = callSearch.toLowerCase();
    return calls.filter(
      (c) =>
        (!statusFilter || c.status === statusFilter) &&
        (!q || `${c.title} ${c.funder} ${c.theme}`.toLowerCase().includes(q))
    );
  }, [calls, callSearch, statusFilter]);

  // Milestones list (minimal demo)
  type Milestone = {
    id: string;
    title: string;
    due: string;
    project?: string;
    notes?: string;
  };
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "M-001",
      title: "IRB Submission",
      due: "2025-10-25",
      project: "NIH-2024-002",
    },
    {
      id: "M-002",
      title: "Budget Draft",
      due: "2025-11-03",
      project: "NSF-2024-001",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Expenses management
  type Expense = {
    id: string;
    date: string;
    purpose: string;
    amount: number;
    category: string;
    project?: string;
    description?: string;
    status: "pending" | "approved" | "rejected";
  };

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "E-001",
      date: "2025-10-15",
      purpose: "Lab Equipment",
      amount: 2500,
      category: "Equipment",
      project: "DOE-2024-003",
      description: "Purchase of specialized research equipment",
      status: "approved",
    },
    {
      id: "E-002",
      date: "2025-10-12",
      purpose: "Conference Travel",
      amount: 1200,
      category: "Travel",
      project: "NSF-2024-001",
      description: "Attending AI research conference",
      status: "pending",
    },
    {
      id: "E-003",
      date: "2025-10-08",
      purpose: "Software License",
      amount: 450,
      category: "Software",
      project: "NIH-2024-002",
      description: "Annual license for data analysis software",
      status: "approved",
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    date: "",
    purpose: "",
    amount: "",
    category: "",
    project: "",
    description: "",
  });

  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  // Assistant management
  type Assistant = {
    id: string;
    name: string;
    email: string;
    expertise: string[];
    assignedApplications: string[];
    status: "available" | "assigned" | "busy";
  };

  const [assistants, setAssistants] = useState<Assistant[]>([
    {
      id: "AST-001",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@university.edu",
      expertise: ["Data Analysis", "Grant Writing", "Research Methodology"],
      assignedApplications: ["APP-001"],
      status: "assigned",
    },
    {
      id: "AST-002",
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      expertise: ["Biostatistics", "Clinical Research", "Protocol Development"],
      assignedApplications: [],
      status: "available",
    },
    {
      id: "AST-003",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@university.edu",
      expertise: [
        "Literature Review",
        "Technical Writing",
        "Project Management",
      ],
      assignedApplications: ["APP-002"],
      status: "assigned",
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [selectedAssistant, setSelectedAssistant] = useState<string>("");

  // Sample applications for assignment
  const availableApplications = [
    {
      id: "APP-001",
      title: "Climate Change Impact Study",
      status: "Under Review",
      deadline: "2025-11-15",
      assignedAssistant: "Dr. Sarah Wilson",
      projectStatus: "In Progress",
      progress: 65,
    },
    {
      id: "APP-002",
      title: "AI Drug Discovery Platform",
      status: "In Progress",
      deadline: "2025-12-10",
      assignedAssistant: "Dr. Emily Rodriguez",
      projectStatus: "In Progress",
      progress: 45,
    },
    {
      id: "APP-003",
      title: "Renewable Energy Research",
      status: "Planning",
      deadline: "2025-10-30",
      assignedAssistant: null,
      projectStatus: "Not Started",
      progress: 0,
    },
  ];

  // Assistant management functions
  const assignAssistant = () => {
    if (!selectedApplication || !selectedAssistant) {
      alert("Please select both an application and an assistant");
      return;
    }

    setAssistants(
      assistants.map((assistant) =>
        assistant.id === selectedAssistant
          ? {
              ...assistant,
              assignedApplications: [
                ...assistant.assignedApplications,
                selectedApplication,
              ],
              status: "assigned",
            }
          : assistant
      )
    );

    setSelectedApplication("");
    setSelectedAssistant("");
  };

  const removeAssistantAssignment = (
    assistantId: string,
    applicationId: string
  ) => {
    setAssistants(
      assistants.map((assistant) =>
        assistant.id === assistantId
          ? {
              ...assistant,
              assignedApplications: assistant.assignedApplications.filter(
                (id) => id !== applicationId
              ),
              status:
                assistant.assignedApplications.length === 1
                  ? "available"
                  : "assigned",
            }
          : assistant
      )
    );
  };

  // Expense management functions
  const addExpense = () => {
    if (
      !newExpense.date ||
      !newExpense.purpose ||
      !newExpense.amount ||
      !newExpense.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const expense: Expense = {
      id: `E-${Date.now()}`,
      date: newExpense.date,
      purpose: newExpense.purpose,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      project: newExpense.project || undefined,
      description: newExpense.description || undefined,
      status: "pending",
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      date: "",
      purpose: "",
      amount: "",
      category: "",
      project: "",
      description: "",
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Financial calculations
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const approvedExpenses = expenses
    .filter((expense) => expense.status === "approved")
    .reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses
    .filter((expense) => expense.status === "pending")
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Events for calendar: calls deadlines + milestone due + meetings + reports
  const events = useMemo(() => {
    const deadlines = calls.map((c) => ({
      type: "Deadline",
      label: `${c.title} due`,
      date: c.deadline,
    }));
    const ms = milestones.map((m) => ({
      type: "Milestone",
      label: `${m.title}${m.project ? ` (${m.project})` : ""}`,
      date: m.due,
    }));
    const meetings = [
      { type: "Meeting", label: "Team Sync", date: "2025-10-18" },
    ];
    const reports = [
      { type: "Report", label: "Q4 Report", date: "2025-12-05" },
    ];
    return [...deadlines, ...ms, ...meetings, ...reports].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [calls, milestones]);

  return (
    <>
      <Helmet>
        <title>Researcher Portal | Research Management Portal</title>
        <meta
          name="description"
          content="Researcher workspace with applications, awards, finance, calendar, and milestones."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="space-y-4">
        <div className="grid lg:grid-cols-4 gap-0 min-h-screen">
          {/* Sidebar */}
          {/* Sidebar (match admin sidebar primitives) */}
          <aside className="lg:col-span-1 w-full">
            <Sidebar collapsible="none" className="w-60 border rounded h-full">
              <SidebarContent className="h-full">
                <SidebarGroup className="h-full">
                  <SidebarGroupLabel>Researcher</SidebarGroupLabel>
                  <SidebarGroupContent className="flex-1">
                    <SidebarMenu className="h-full">
                      {/* Dashboard */}
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
                            <BarChart3 className="h-4 w-4" />
                            <span>Dashboard</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "new-application"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("new-application")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <FilePlus2 className="h-4 w-4" />
                            <span>New Application</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "add-award"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("add-award")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <AwardIcon className="h-4 w-4" />
                            <span>Add Award</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "apply-call"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("apply-call")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            <span>Apply for a Call</span>
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
                            <span>Financial Reports</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "finance"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("finance")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <DollarSign className="h-4 w-4" />
                            <span>Finance</span>
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
                          data-active={activeTab === "add-milestone"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("add-milestone")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <Flag className="h-4 w-4" />
                            <span>Add Milestone</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "add-assistant"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("add-assistant")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <Users className="h-4 w-4" />
                            <span>Add Assistant</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          data-active={activeTab === "assign-task"}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTab("assign-task")}
                            className="w-full text-left flex items-center gap-2"
                          >
                            <Users className="h-4 w-4" />
                            <span>Assign Task</span>
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
          <section className="lg:col-span-3 w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-3"
            >
              <TabsList className="hidden" aria-hidden="true">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="new-application">
                  New Application
                </TabsTrigger>
                <TabsTrigger value="add-award">Add Award</TabsTrigger>
                <TabsTrigger value="apply-call">Apply for a Call</TabsTrigger>
                <TabsTrigger value="reports">Financial Reports</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="add-milestone">Add Milestone</TabsTrigger>
                <TabsTrigger value="add-assistant">Add Assistant</TabsTrigger>
                <TabsTrigger value="assign-task">Assign Task</TabsTrigger>
              </TabsList>

              {/* Dashboard */}
              <TabsContent value="dashboard">
                <div className="space-y-6">
                  {/* Metrics Cards */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600">
                          {calls.filter((c) => c.status === "Active").length}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Active Calls
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-green-600">
                          3
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Active Awards
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-orange-600">
                          {events.length}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Upcoming Events
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-purple-600">
                          {milestones.length}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Active Milestones
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Dashboard Content */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Active Awards */}
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AwardIcon className="h-5 w-5 text-green-600" />
                          Active Awards
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Track your current research projects and funding
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>DOE Clean Energy Award</span>
                            <span className="font-medium">$500,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>NIH Biomedical Research</span>
                            <span className="font-medium">$400,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>NSF Basic Research</span>
                            <span className="font-medium">$250,000</span>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => (window.location.href = "/awards")}
                        >
                          View All Awards
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Open Calls */}
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          Open Calls
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Available funding opportunities
                        </p>
                        <div className="space-y-2 mb-4">
                          {calls.slice(0, 3).map((call) => (
                            <div
                              key={call.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <div>
                                <div className="font-medium">{call.funder}</div>
                                <div className="text-muted-foreground text-xs">
                                  Due: {call.deadline}
                                </div>
                              </div>
                              <Badge
                                variant={
                                  call.status === "Active"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {call.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => setActiveTab("apply-call")}
                        >
                          Browse All Calls
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Upcoming Deadlines */}
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-600" />
                          Upcoming Deadlines
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Important dates and milestones
                        </p>
                        <div className="space-y-2 mb-4">
                          {events.slice(0, 3).map((event, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm"
                            >
                              <div>
                                <div className="font-medium">{event.label}</div>
                                <div className="text-muted-foreground text-xs">
                                  {event.date}
                                </div>
                              </div>
                              <Badge variant="secondary">{event.type}</Badge>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => setActiveTab("calendar")}
                        >
                          View Calendar
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Active Milestones */}
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Flag className="h-5 w-5 text-purple-600" />
                          Active Milestones
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Track your project milestones and deliverables
                        </p>
                        <div className="space-y-2 mb-4">
                          {milestones.map((milestone) => (
                            <div
                              key={milestone.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <div>
                                <div className="font-medium">
                                  {milestone.title}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  Due: {milestone.due}
                                </div>
                              </div>
                              <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => setActiveTab("add-milestone")}
                        >
                          Manage Milestones
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Financial Overview */}
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          Financial Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your funding and spending summary
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Total Awarded</span>
                            <span className="font-medium text-green-600">
                              $1.2M
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Spent to Date</span>
                            <span className="font-medium">
                              ${(approvedExpenses / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Pending</span>
                            <span className="font-medium text-orange-600">
                              ${(pendingExpenses / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Remaining</span>
                            <span className="font-medium text-blue-600">
                              $
                              {((1200000 - approvedExpenses) / 1000).toFixed(0)}
                              K
                            </span>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => setActiveTab("finance")}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Common tasks and shortcuts
                        </p>
                        <div className="space-y-2 mb-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setActiveTab("new-application")}
                          >
                            <FilePlus2 className="h-4 w-4 mr-2" />
                            New Application
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setActiveTab("add-award")}
                          >
                            <AwardIcon className="h-4 w-4 mr-2" />
                            Add Award
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setActiveTab("add-milestone")}
                          >
                            <Flag className="h-4 w-4 mr-2" />
                            Add Milestone
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* New Application */}
              {/* New Application */}
              <TabsContent value="new-application">
                <Card>
                  <CardHeader>
                    <CardTitle>Start a New Application</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Application Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Application Title
                        </Label>
                        <Input placeholder="e.g., AI for Sustainable Energy" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Call Reference or Name
                        </Label>
                        <Input placeholder="e.g., NSF-2025-001 or type to search" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Application ID
                        </Label>
                        <Input placeholder="Auto-generated or enter custom ID" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Research Category
                        </Label>
                        <select className="w-full h-10 rounded border px-3 text-sm bg-background">
                          <option value="">Select category</option>
                          <option>Health & Medicine</option>
                          <option>Energy & Environment</option>
                          <option>Computer Science</option>
                          <option>Social Sciences</option>
                          <option>Education</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Abstract
                      </Label>
                      <Textarea placeholder="Short summary of the proposed research..." />
                    </div>

                    {/*upload supporting docs*/}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Upload Supporting Documents
                      </Label>
                      <div className="border-2 border-dashed rounded p-4 text-sm text-muted-foreground">
                        <p className="mb-3">
                          Drag and drop files here, or click to select files
                        </p>
                        <Input
                          type="file"
                          multiple
                          className="cursor-pointer"
                        />
                        <p className="mt-2 text-xs">
                          Accepted: PDF, DOCX, XLSX, ZIP (max 25MB each)
                        </p>
                      </div>
                    </div>

                    {/* Guidelines */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Guidelines
                      </Label>
                      <div className="rounded border p-4 text-sm space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Ensure budget tables follow sponsor format.</li>
                          <li>Include ethics/IRB details if applicable.</li>
                          <li>Attach CVs and letters of support.</li>
                          <li>Check page limits and font requirements.</li>
                        </ul>
                        <div className="pt-2">
                          <Button variant="outline" size="sm">
                            View Full Guidelines
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Add Team Member */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Add Team Member
                      </Label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          placeholder="Enter staff email or ID"
                          className="sm:flex-1"
                        />
                        <Button>Add User</Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Invite collaborators to edit and submit this
                        application.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button>Save Draft</Button>
                      <Button variant="outline">Submit</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Add Award */}
              <TabsContent value="add-award">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Award</CardTitle>
                  </CardHeader>
                  {/* Uploading Box */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Upload Award Documents
                    </Label>
                    <div className="border-2 border-dashed rounded p-4 text-sm text-muted-foreground">
                      <p className="mb-3">
                        Drag and drop files here, or click to select files
                      </p>
                      <Input type="file" multiple className="cursor-pointer" />
                      <p className="mt-2 text-xs">
                        Accepted: PDF, DOCX, XLSX, ZIP (max 25MB each)
                      </p>
                    </div>
                  </div>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Award Title
                        </Label>
                        <Input placeholder="e.g., DOE Clean Energy Award" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Sponsor / Funder
                        </Label>
                        <Input placeholder="e.g., Department of Energy" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Amount
                        </Label>
                        <Input placeholder="$250,000" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Award Number
                        </Label>
                        <Input placeholder="e.g., DOE-2025-789" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Start Date
                        </Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          End Date
                        </Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Notes
                      </Label>
                      <Textarea placeholder="Any relevant details..." />
                    </div>
                    <div className="flex gap-2">
                      <Button>Add Award</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Apply for a Call */}
              {/* Apply for a Call */}
              <TabsContent value="apply-call">
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for a Call</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search + Filter */}
                    <div className="flex flex-col md:flex-row gap-2">
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
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="Active">Active</option>
                          <option value="Closing Soon">Closing Soon</option>
                        </select>
                      </div>
                    </div>

                    {/* Calls List */}
                    {filteredCalls.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No calls match your criteria.
                      </p>
                    )}

                    <div className="space-y-3">
                      {filteredCalls.map((c) => (
                        <Card key={c.id} className="hover:shadow-sm">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-lg">
                                  {c.title}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground">
                                  {c.funder} • {c.theme} • Max {c.maxAward}
                                </div>
                              </div>
                              <div className="text-right text-sm">
                                <Badge
                                  variant={
                                    c.status === "Active"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {c.status}
                                </Badge>
                                <div className="text-muted-foreground mt-1">
                                  Deadline: {c.deadline}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex gap-2">
                            <Button
                              onClick={() => setActiveTab("new-application")}
                            >
                              Apply
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => (window.location.href = "/calls")}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Financial Reports */}
              <TabsContent value="reports">
                <div className="space-y-6">
                  {/* Financial Overview Cards */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-green-600">
                          $1.2M
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total Awarded
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600">
                          ${(approvedExpenses / 1000).toFixed(0)}K
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Approved Expenses
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-orange-600">
                          ${(pendingExpenses / 1000).toFixed(0)}K
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pending Expenses
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-purple-600">
                          ${((1200000 - approvedExpenses) / 1000).toFixed(0)}K
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Remaining Balance
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Add New Expense */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Add New Expense
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Date *
                          </Label>
                          <Input
                            type="date"
                            value={newExpense.date}
                            onChange={(e) =>
                              setNewExpense({
                                ...newExpense,
                                date: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Amount *
                          </Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={newExpense.amount}
                            onChange={(e) =>
                              setNewExpense({
                                ...newExpense,
                                amount: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Purpose *
                          </Label>
                          <Input
                            placeholder="e.g., Lab Equipment, Travel, Software"
                            value={newExpense.purpose}
                            onChange={(e) =>
                              setNewExpense({
                                ...newExpense,
                                purpose: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Category *
                          </Label>
                          <select
                            className="w-full h-10 rounded border px-3 text-sm bg-background"
                            value={newExpense.category}
                            onChange={(e) =>
                              setNewExpense({
                                ...newExpense,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="">Select category</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Travel">Travel</option>
                            <option value="Software">Software</option>
                            <option value="Supplies">Supplies</option>
                            <option value="Personnel">Personnel</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Project (Optional)
                          </Label>
                          <Input
                            placeholder="e.g., DOE-2024-003"
                            value={newExpense.project}
                            onChange={(e) =>
                              setNewExpense({
                                ...newExpense,
                                project: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Description (Optional)
                          </Label>
                          <Textarea
                            placeholder="Additional details about this expense..."
                            value={newExpense.description}
                            onChange={(e) =>
                              setNewExpense({
                                ...newExpense,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addExpense}>Add Expense</Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            setNewExpense({
                              date: "",
                              purpose: "",
                              amount: "",
                              category: "",
                              project: "",
                              description: "",
                            })
                          }
                        >
                          Clear
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expense List */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        Expense History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {expenses.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          No expenses recorded yet. Add your first expense
                          above.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {expenses.map((expense) => (
                            <div
                              key={expense.id}
                              className="border rounded-lg p-4"
                            >
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <div className="font-medium">
                                    {expense.purpose}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {expense.date} • {expense.category}
                                    {expense.project && ` • ${expense.project}`}
                                  </div>
                                  {expense.description && (
                                    <div className="text-sm text-muted-foreground">
                                      {expense.description}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right space-y-1">
                                  <div className="font-medium">
                                    ${expense.amount.toLocaleString()}
                                  </div>
                                  <Badge
                                    variant={
                                      expense.status === "approved"
                                        ? "default"
                                        : expense.status === "pending"
                                        ? "secondary"
                                        : "destructive"
                                    }
                                  >
                                    {expense.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setEditingExpenseId(expense.id)
                                  }
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteExpense(expense.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Downloadable Reports */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Downloadable Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" /> Quarterly
                        Financial Report (PDF)
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" /> Expense Summary
                        (CSV)
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" /> Annual Summary
                        (PDF)
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Finance */}
              <TabsContent value="finance">
                <div className="space-y-6">
                  {/* Financial Metrics */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-orange-600">
                          ${(pendingExpenses / 1000).toFixed(0)}K
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pending Reimbursements
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600">
                          {
                            expenses.filter((e) => e.status === "pending")
                              .length
                          }
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pending Approvals
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-green-600">
                          3
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Active Awards
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Transactions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {expenses.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No recent transactions to display.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {expenses.slice(0, 5).map((expense) => (
                            <div
                              key={expense.id}
                              className="flex justify-between items-center p-3 border rounded"
                            >
                              <div>
                                <div className="font-medium">
                                  {expense.purpose}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {expense.date} • {expense.category}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  ${expense.amount.toLocaleString()}
                                </div>
                                <Badge
                                  variant={
                                    expense.status === "approved"
                                      ? "default"
                                      : expense.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {expense.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        className="w-full justify-start"
                        onClick={() => setActiveTab("reports")}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Add New Expense
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Financial Reports
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download Expense Summary
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Calendar */}
              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View deadlines, milestones, and events. For a full
                      calendar, visit the Calendar page.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="p-3 rounded border">
                        <Badge variant="secondary" className="mr-2">
                          Due
                        </Badge>{" "}
                        Proposal Draft — Oct 15
                      </div>
                      <div className="p-3 rounded border">
                        <Badge variant="secondary" className="mr-2">
                          Meeting
                        </Badge>{" "}
                        Team Sync — Oct 18
                      </div>
                      <div className="p-3 rounded border">
                        <Badge variant="secondary" className="mr-2">
                          Deadline
                        </Badge>{" "}
                        Call Submission — Nov 1
                      </div>
                      <div className="p-3 rounded border">
                        <Badge variant="secondary" className="mr-2">
                          Report
                        </Badge>{" "}
                        Q4 Report — Dec 5
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Add Milestone */}
              {/* Add Milestone */}
              <TabsContent value="add-milestone">
                <Card>
                  <CardHeader>
                    <CardTitle>Milestones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add New Milestone */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Milestone Title
                        </Label>
                        <Input placeholder="e.g., IRB Approval" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Due Date
                          </Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Related Project / Award
                          </Label>
                          <Input placeholder="e.g., DOE-2025-789" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Description
                        </Label>
                        <Textarea placeholder="Details about this milestone..." />
                      </div>
                      {/* Upload Deliverable for new milestone (optional) */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Upload Deliverable
                        </Label>
                        <div className="border-2 border-dashed rounded p-4 text-sm text-muted-foreground">
                          <p className="mb-3">
                            Drag and drop deliverable, or click to select
                          </p>
                          <Input type="file" className="cursor-pointer" />
                          <p className="mt-2 text-xs">
                            Accepted: PDF, DOCX, ZIP (max 25MB)
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button>Add Milestone</Button>
                        <Button variant="outline">Cancel</Button>
                      </div>
                    </div>

                    {/* Existing Milestones List with Edit and Upload */}
                    <div className="space-y-3">
                      {milestones.map((m) => (
                        <Card key={m.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg">
                                  {m.title}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground">
                                  Due: {m.due}{" "}
                                  {m.project ? `• ${m.project}` : ""}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {editingId === m.id ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => setEditingId(null)}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setEditingId(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingId(m.id)}
                                  >
                                    Edit
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {editingId === m.id && (
                              <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">
                                    Title
                                  </Label>
                                  <Input defaultValue={m.title} />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">
                                    Due Date
                                  </Label>
                                  <Input type="date" defaultValue={m.due} />
                                </div>
                              </div>
                            )}

                            {/* Upload Deliverable for existing milestone */}
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                Upload Deliverable
                              </Label>
                              <div className="border rounded p-3">
                                <Input type="file" className="cursor-pointer" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Add Assistant */}
              <TabsContent value="add-assistant">
                <div className="space-y-6">
                  {/* Assignment Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        Assign Assistant to Application
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Select Application
                          </Label>
                          <select
                            className="w-full h-10 rounded border px-3 text-sm bg-background"
                            value={selectedApplication}
                            onChange={(e) =>
                              setSelectedApplication(e.target.value)
                            }
                          >
                            <option value="">Choose an application...</option>
                            {availableApplications.map((app) => (
                              <option key={app.id} value={app.id}>
                                {app.title} ({app.status})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Select Assistant
                          </Label>
                          <select
                            className="w-full h-10 rounded border px-3 text-sm bg-background"
                            value={selectedAssistant}
                            onChange={(e) =>
                              setSelectedAssistant(e.target.value)
                            }
                          >
                            <option value="">Choose an assistant...</option>
                            {assistants
                              .filter((a) => a.status !== "busy")
                              .map((assistant) => (
                                <option key={assistant.id} value={assistant.id}>
                                  {assistant.name} ({assistant.status})
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <Button onClick={assignAssistant} className="w-full">
                        Assign Assistant
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Applications List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {availableApplications.map((app) => (
                          <div key={app.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="font-medium">{app.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  ID: {app.id} • Status: {app.status} •
                                  Deadline: {app.deadline}
                                </div>
                                {app.assignedAssistant && (
                                  <div className="text-sm text-green-600">
                                    Assigned to: {app.assignedAssistant}
                                  </div>
                                )}
                              </div>
                              <Badge
                                variant={
                                  app.assignedAssistant
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {app.assignedAssistant
                                  ? "Assigned"
                                  : "Available"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assistants List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Assistant Researchers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assistants.map((assistant) => (
                          <div
                            key={assistant.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-2 flex-1">
                                <div className="font-medium">
                                  {assistant.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {assistant.email}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {assistant.expertise.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                                {assistant.assignedApplications.length > 0 && (
                                  <div className="text-sm">
                                    <div className="font-medium mb-1">
                                      Assigned Applications:
                                    </div>
                                    <div className="space-y-1">
                                      {assistant.assignedApplications.map(
                                        (appId) => {
                                          const app =
                                            availableApplications.find(
                                              (a) => a.id === appId
                                            );
                                          return (
                                            <div
                                              key={appId}
                                              className="flex items-center justify-between bg-muted p-2 rounded text-xs"
                                            >
                                              <div className="flex-1">
                                                <div className="font-medium">
                                                  {app?.title || appId}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <Badge
                                                    variant={
                                                      app?.projectStatus ===
                                                      "In Progress"
                                                        ? "default"
                                                        : app?.projectStatus ===
                                                          "Completed"
                                                        ? "default"
                                                        : "secondary"
                                                    }
                                                    className="text-xs"
                                                  >
                                                    {app?.projectStatus}
                                                  </Badge>
                                                  <div className="text-xs text-muted-foreground">
                                                    {app?.progress}% complete
                                                  </div>
                                                </div>
                                              </div>
                                              <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                  removeAssistantAssignment(
                                                    assistant.id,
                                                    appId
                                                  )
                                                }
                                              >
                                                Remove
                                              </Button>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant={
                                    assistant.status === "available"
                                      ? "default"
                                      : assistant.status === "assigned"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {assistant.status}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {assistant.assignedApplications.length}{" "}
                                  assigned
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600">
                          {assistants.length}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total Assistants
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-green-600">
                          {
                            assistants.filter((a) => a.status === "available")
                              .length
                          }
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Available
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-orange-600">
                          {
                            assistants.filter((a) => a.status === "assigned")
                              .length
                          }
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Assigned
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Assign Task */}
              <TabsContent value="assign-task">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        Assign Task to Assistant Researcher
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded border p-4 space-y-3">
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Assistant
                            </Label>
                            <select
                              className="w-full h-10 rounded border px-3 text-sm bg-background"
                              value={selectedAssistant}
                              onChange={(e) =>
                                setSelectedAssistant(e.target.value)
                              }
                            >
                              <option value="">Choose assistant...</option>
                              {assistants.map((a) => (
                                <option key={a.id} value={a.id}>
                                  {a.name} ({a.status})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Project
                            </Label>
                            <select
                              className="w-full h-10 rounded border px-3 text-sm bg-background"
                              value={selectedApplication}
                              onChange={(e) =>
                                setSelectedApplication(e.target.value)
                              }
                            >
                              <option value="">
                                Choose project/application...
                              </option>
                              {availableApplications.map((app) => (
                                <option key={app.id} value={app.id}>
                                  {app.title} ({app.status})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Task Title
                            </Label>
                            <Input placeholder="e.g., Draft methodology section" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Due Date
                            </Label>
                            <Input type="date" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Details
                          </Label>
                          <Textarea placeholder="Describe the task, resources, and expectations..." />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Priority
                            </Label>
                            <select className="w-full h-10 rounded border px-3 text-sm bg-background">
                              <option>Normal</option>
                              <option>High</option>
                              <option>Low</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Attachment (optional)
                            </Label>
                            <Input type="file" className="cursor-pointer" />
                          </div>
                        </div>
                        <Button onClick={() => alert("Task assigned (demo)")}>
                          Assign Task
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Assistant Researchers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assistants.map((assistant) => (
                          <div
                            key={assistant.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-2 flex-1">
                                <div className="font-medium">
                                  {assistant.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {assistant.email}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {assistant.expertise.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="text-sm">
                                  <div className="font-medium mb-1">
                                    Projects Assisting On:
                                  </div>
                                  {assistant.assignedApplications.length ===
                                  0 ? (
                                    <div className="text-xs text-muted-foreground">
                                      None yet
                                    </div>
                                  ) : (
                                    <div className="space-y-1">
                                      {assistant.assignedApplications.map(
                                        (appId) => {
                                          const app =
                                            availableApplications.find(
                                              (a) => a.id === appId
                                            );
                                          return (
                                            <div
                                              key={appId}
                                              className="flex items-center justify-between bg-muted p-2 rounded text-xs"
                                            >
                                              <div className="flex-1">
                                                <div className="font-medium">
                                                  {app?.title || appId}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <Badge
                                                    variant={
                                                      app?.projectStatus ===
                                                      "In Progress"
                                                        ? "default"
                                                        : app?.projectStatus ===
                                                          "Completed"
                                                        ? "default"
                                                        : "secondary"
                                                    }
                                                    className="text-xs"
                                                  >
                                                    {app?.projectStatus}
                                                  </Badge>
                                                  <div className="text-xs text-muted-foreground">
                                                    {app?.progress}% complete
                                                  </div>
                                                </div>
                                              </div>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                  setSelectedAssistant(
                                                    assistant.id
                                                  )
                                                }
                                              >
                                                Assign Task
                                              </Button>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant={
                                    assistant.status === "available"
                                      ? "default"
                                      : assistant.status === "assigned"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {assistant.status}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {assistant.assignedApplications.length}{" "}
                                  assigned
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </>
  );
}
