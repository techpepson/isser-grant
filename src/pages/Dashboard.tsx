import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Trophy, 
  DollarSign, 
  Calendar, 
  Clock, 
  TrendingUp,
  Plus,
  FileCheck,
  UserPlus,
  ClipboardCheck,
  Calculator
} from "lucide-react";
import QuickApplicationForm from "@/components/forms/QuickApplicationForm";
import AddResearcherForm from "@/components/forms/AddResearcherForm";
import ReviewAwardForm from "@/components/forms/ReviewAwardForm";
import FinancialReportForm from "@/components/forms/FinancialReportForm";

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  
  const stats = [
    {
      title: "Active Researchers",
      value: 156,
      description: "Registered in the system",
      icon: Users,
      trend: { value: 12, label: "from last month" }
    },
    {
      title: "Open Applications",
      value: 23,
      description: "Pending review",
      icon: FileText,
      trend: { value: -5, label: "from last week" }
    },
    {
      title: "Active Awards",
      value: 89,
      description: "Currently funded",
      icon: Trophy,
      trend: { value: 8, label: "from last quarter" }
    },
    {
      title: "Total Funding",
      value: "$2.4M",
      description: "Allocated this year",
      icon: DollarSign,
      trend: { value: 15, label: "from last year" }
    }
  ];

  const recentApplications = [
    {
      id: "APP-2024-001",
      title: "Climate Change Impact on Coastal Ecosystems",
      applicant: "Dr. Sarah Johnson",
      amount: "$85,000",
      status: "Under Review",
      submittedDate: "2024-01-15"
    },
    {
      id: "APP-2024-002", 
      title: "AI-Driven Drug Discovery Platform",
      applicant: "Prof. Michael Chen",
      amount: "$120,000",
      status: "Approved",
      submittedDate: "2024-01-12"
    },
    {
      id: "APP-2024-003",
      title: "Renewable Energy Storage Solutions",
      applicant: "Dr. Emily Rodriguez",
      amount: "$95,000",
      status: "Needs Revision",
      submittedDate: "2024-01-10"
    }
  ];

  const upcomingDeadlines = [
    {
      title: "NSF Research Grant Application",
      date: "2024-02-15",
      daysLeft: 12,
      type: "Application Deadline"
    },
    {
      title: "Quarterly Progress Report",
      date: "2024-02-20",
      daysLeft: 17,
      type: "Report Due"
    },
    {
      title: "Budget Review Meeting",
      date: "2024-02-25",
      daysLeft: 22,
      type: "Meeting"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Research Management Portal</title>
        <meta name="description" content="Dashboard overview for the research management portal with quick stats and recent activity." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back. Here&apos;s what&apos;s happening across your research projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Applications
              </CardTitle>
              <CardDescription>
                Latest grant applications submitted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{application.title}</p>
                      <p className="text-sm text-muted-foreground">{application.applicant}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {application.id}
                        </Badge>
                        <Badge 
                          variant={
                            application.status === "Approved" ? "default" :
                            application.status === "Under Review" ? "secondary" :
                            "destructive"
                          }
                          className="text-xs"
                        >
                          {application.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{application.amount}</p>
                      <p className="text-xs text-muted-foreground">{application.submittedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Applications
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>
                Important dates and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{deadline.title}</p>
                      <p className="text-sm text-muted-foreground">{deadline.type}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Badge 
                        variant={deadline.daysLeft <= 7 ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {deadline.daysLeft} days
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used actions with staff ID integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Dialog open={openDialog === "application"} onOpenChange={(open) => setOpenDialog(open ? "application" : null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                    <FileCheck className="h-6 w-6" />
                    <span className="text-sm">New Application</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit New Research Application</DialogTitle>
                    <DialogDescription>Submit a new research funding application using your staff ID</DialogDescription>
                  </DialogHeader>
                  <QuickApplicationForm onCancel={() => setOpenDialog(null)} />
                </DialogContent>
              </Dialog>

              <Dialog open={openDialog === "researcher"} onOpenChange={(open) => setOpenDialog(open ? "researcher" : null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                    <UserPlus className="h-6 w-6" />
                    <span className="text-sm">Add Researcher</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Researcher</DialogTitle>
                    <DialogDescription>Register a new researcher in the system</DialogDescription>
                  </DialogHeader>
                  <AddResearcherForm onCancel={() => setOpenDialog(null)} />
                </DialogContent>
              </Dialog>

              <Dialog open={openDialog === "review"} onOpenChange={(open) => setOpenDialog(open ? "review" : null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                    <ClipboardCheck className="h-6 w-6" />
                    <span className="text-sm">Review Award</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit Award Review</DialogTitle>
                    <DialogDescription>Submit your review and evaluation for an award application</DialogDescription>
                  </DialogHeader>
                  <ReviewAwardForm onCancel={() => setOpenDialog(null)} />
                </DialogContent>
              </Dialog>

              <Dialog open={openDialog === "financial"} onOpenChange={(open) => setOpenDialog(open ? "financial" : null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                    <Calculator className="h-6 w-6" />
                    <span className="text-sm">Financial Report</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit Financial Report</DialogTitle>
                    <DialogDescription>Submit financial reporting for your research project</DialogDescription>
                  </DialogHeader>
                  <FinancialReportForm onCancel={() => setOpenDialog(null)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
