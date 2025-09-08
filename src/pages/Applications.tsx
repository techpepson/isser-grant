import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  DollarSign, 
  User, 
  ExternalLink, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X
} from "lucide-react";
import QuickApplicationForm from "@/components/forms/QuickApplicationForm";

export default function Applications() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  const [searchTerm, setSearchTerm] = useState("");
  const [openNewAppDialog, setOpenNewAppDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [filters, setFilters] = useState({
    statuses: [] as string[],
    departments: [] as string[],
    amount: ""
  });

  const applications = [
    {
      id: "APP-2024-001",
      title: "Climate Change Impact on Coastal Ecosystems",
      applicant: {
        name: "Dr. Sarah Johnson",
        department: "Environmental Studies",
        avatar: "/api/placeholder/32/32"
      },
      callTitle: "NSF Research Grant Program",
      requestedAmount: "$85,000",
      submittedDate: "2024-01-15",
      deadline: "2024-03-15",
      status: "Under Review",
      reviewStage: "Technical Review",
      reviewers: 3,
      score: null,
      documents: ["Proposal", "Budget", "CV", "Letters"]
    },
    {
      id: "APP-2024-002",
      title: "AI-Driven Drug Discovery Platform", 
      applicant: {
        name: "Prof. Michael Chen",
        department: "Computer Science",
        avatar: "/api/placeholder/32/32"
      },
      callTitle: "NIH Biomedical Research Excellence",
      requestedAmount: "$120,000",
      submittedDate: "2024-01-12",
      deadline: "2024-04-01",
      status: "Approved",
      reviewStage: "Final Approval",
      reviewers: 4,
      score: 4.2,
      documents: ["Proposal", "Budget", "CV", "Letters", "Ethics Approval"]
    },
    {
      id: "APP-2024-003",
      title: "Renewable Energy Storage Solutions",
      applicant: {
        name: "Dr. Emily Rodriguez", 
        department: "Electrical Engineering",
        avatar: "/api/placeholder/32/32"
      },
      callTitle: "DOE Clean Energy Initiative",
      requestedAmount: "$95,000",
      submittedDate: "2024-01-10",
      deadline: "2024-05-20",
      status: "Needs Revision",
      reviewStage: "Initial Review",
      reviewers: 2,
      score: 2.8,
      documents: ["Proposal", "Budget", "CV"]
    },
    {
      id: "APP-2024-004", 
      title: "Quantum Computing Architecture Research",
      applicant: {
        name: "Prof. David Kumar",
        department: "Physics & Astronomy", 
        avatar: "/api/placeholder/32/32"
      },
      callTitle: "DARPA Defense Research Projects",
      requestedAmount: "$450,000",
      submittedDate: "2024-01-08",
      deadline: "2024-06-30",
      status: "Under Review",
      reviewStage: "Security Review",
      reviewers: 5,
      score: null,
      documents: ["Proposal", "Budget", "CV", "Security Clearance", "Technical Specs"]
    },
    {
      id: "APP-2024-005",
      title: "Cognitive Learning Assessment Tools",
      applicant: {
        name: "Dr. Lisa Park",
        department: "Psychology",
        avatar: "/api/placeholder/32/32"
      }, 
      callTitle: "Education Research and Development",
      requestedAmount: "$75,000",
      submittedDate: "2024-01-05",
      deadline: "2024-07-15",
      status: "Rejected",
      reviewStage: "Final Decision",
      reviewers: 3,
      score: 2.1,
      documents: ["Proposal", "Budget", "CV", "Letters"]
    },
    {
      id: "APP-2024-006",
      title: "Sustainable Agriculture Monitoring System",
      applicant: {
        name: "Dr. James Wilson",
        department: "Agricultural Sciences",
        avatar: "/api/placeholder/32/32"
      },
      callTitle: "EPA Environmental Sustainability",
      requestedAmount: "$110,000", 
      submittedDate: "2024-01-03",
      deadline: "2024-02-28",
      status: "Submitted",
      reviewStage: "Pending Assignment",
      reviewers: 0,
      score: null,
      documents: ["Proposal", "Budget", "CV", "Letters", "Environmental Impact"]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "Needs Revision":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "Rejected":
        return "destructive";
      case "Needs Revision":
        return "secondary";
      case "Under Review":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Get unique values for filter options
  const allStatuses = [...new Set(applications.map(app => app.status))];
  const allDepartments = [...new Set(applications.map(app => app.applicant.department))];

  const parseAmount = (amount: string) => {
    return parseInt(amount.replace(/[$,]/g, ''));
  };

  const filteredApplications = applications.filter(app => {
    // Search filter
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.callTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(app.status);

    // Department filter
    const matchesDepartment = filters.departments.length === 0 || 
      filters.departments.includes(app.applicant.department);

    // Amount filter
    let matchesAmount = true;
    if (filters.amount) {
      const requestedAmount = parseAmount(app.requestedAmount);
      switch (filters.amount) {
        case "under-50k":
          matchesAmount = requestedAmount < 50000;
          break;
        case "50k-100k":
          matchesAmount = requestedAmount >= 50000 && requestedAmount <= 100000;
          break;
        case "100k-200k":
          matchesAmount = requestedAmount >= 100000 && requestedAmount <= 200000;
          break;
        case "over-200k":
          matchesAmount = requestedAmount > 200000;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDepartment && matchesAmount;
  });

  const clearFilters = () => {
    setFilters({
      statuses: [],
      departments: [],
      amount: ""
    });
  };

  const hasActiveFilters = filters.statuses.length > 0 || filters.departments.length > 0 || filters.amount;

  const pendingApps = filteredApplications.filter(app => 
    app.status === "Submitted" || app.status === "Under Review"
  );
  const approvedApps = filteredApplications.filter(app => app.status === "Approved");
  const needsAttentionApps = filteredApplications.filter(app => 
    app.status === "Needs Revision" || app.status === "Rejected"
  );

  return (
    <>
      <Helmet>
        <title>Applications | Research Management Portal</title>
        <meta name="description" content="Track grant applications, statuses, and submission details." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Track and manage research grant applications throughout the review process.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search applications, applicants, or calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
              <DialogTrigger asChild>
                <Button variant={hasActiveFilters ? "default" : "outline"} size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {Object.values(filters).filter(Boolean).length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Filter Applications</DialogTitle>
                  <DialogDescription>Filter applications by status, department, and amount.</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Status</Label>
                    <div className="space-y-2">
                      {allStatuses.map(status => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={filters.statuses.includes(status)}
                            onCheckedChange={(checked) => 
                              setFilters(prev => ({
                                ...prev,
                                statuses: checked 
                                  ? [...prev.statuses, status]
                                  : prev.statuses.filter(s => s !== status)
                              }))
                            }
                          />
                          <Label htmlFor={`status-${status}`} className="text-sm">
                            {status}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Department</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {allDepartments.map(department => (
                        <div key={department} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dept-${department}`}
                            checked={filters.departments.includes(department)}
                            onCheckedChange={(checked) => 
                              setFilters(prev => ({
                                ...prev,
                                departments: checked 
                                  ? [...prev.departments, department]
                                  : prev.departments.filter(d => d !== department)
                              }))
                            }
                          />
                          <Label htmlFor={`dept-${department}`} className="text-sm">
                            {department}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Requested Amount</Label>
                    <Select value={filters.amount} onValueChange={(value) => setFilters(prev => ({...prev, amount: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select amount range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50k">Under $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-200k">$100K - $200K</SelectItem>
                        <SelectItem value="over-200k">Over $200K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={clearFilters} className="flex-1">
                      <X className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                    <Button onClick={() => setOpenFilterDialog(false)} className="flex-1">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={openNewAppDialog} onOpenChange={setOpenNewAppDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  New Application
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Submit New Research Application</DialogTitle>
                  <DialogDescription>Submit a new research funding application using your staff ID.</DialogDescription>
                </DialogHeader>
                <QuickApplicationForm onCancel={() => setOpenNewAppDialog(false)} onSubmit={() => setOpenNewAppDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{pendingApps.length}</div>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{approvedApps.length}</div>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                ${(applications.reduce((sum, app) => 
                  sum + parseInt(app.requestedAmount.replace(/[$,]/g, "")), 0) / 1000).toFixed(0)}K
              </div>
              <p className="text-sm text-muted-foreground">Total Requested</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Applications ({filteredApplications.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Review ({pendingApps.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedApps.length})</TabsTrigger>
            <TabsTrigger value="attention">Needs Attention ({needsAttentionApps.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={application.applicant.avatar} />
                          <AvatarFallback>
                            {application.applicant.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{application.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {application.applicant.name} • {application.applicant.department}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {application.id}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {application.requestedAmount}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Submitted: {application.submittedDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(application.status)}
                        <Badge variant={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                      {application.score && (
                        <div className="text-sm text-muted-foreground">
                          Score: <span className="font-medium">{application.score}/5.0</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-1">Funding Call:</p>
                    <p className="text-sm text-muted-foreground">{application.callTitle}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Review Status:</p>
                      <div className="space-y-1 text-sm">
                        <div>Stage: <span className="font-medium">{application.reviewStage}</span></div>
                        <div>Reviewers: <span className="font-medium">{application.reviewers} assigned</span></div>
                        <div>Deadline: <span className="font-medium">{application.deadline}</span></div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Documents:</p>
                      <div className="flex flex-wrap gap-1">
                        {application.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Application
                    </Button>
                    <Button variant="outline" size="sm">
                      Review History
                    </Button>
                    {application.status === "Needs Revision" && (
                      <Button variant="secondary" size="sm">
                        Submit Revision
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingApps.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{application.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {application.applicant.name} • {application.reviewStage}
                      </p>
                    </div>
                    <Badge variant="secondary">{application.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedApps.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{application.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {application.applicant.name} • Score: {application.score}/5.0
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">Approved</Badge>
                      <p className="text-sm font-medium mt-1">{application.requestedAmount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="attention" className="space-y-4">
            {needsAttentionApps.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{application.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {application.applicant.name} • {application.status}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
