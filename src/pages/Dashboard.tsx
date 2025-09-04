import { Helmet } from "react-helmet-async";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, FileText, Trophy, DollarSign, Calendar, Clock, AlertTriangle, TrendingUp } from "lucide-react";

export default function Dashboard() {
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
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button className="h-20 flex-col gap-2">
                <FileText className="h-5 w-5" />
                New Application
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-5 w-5" />
                Add Researcher
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Trophy className="h-5 w-5" />
                Review Award
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
