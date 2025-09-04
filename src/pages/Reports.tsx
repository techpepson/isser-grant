import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, User } from "lucide-react";

export default function Reports() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  
  const reports = [
    {
      id: "RPT-001",
      title: "Quarterly Progress Report - Q1 2024",
      project: "AI-Driven Drug Discovery Platform",
      type: "Technical Report",
      submittedBy: "Prof. Michael Chen",
      submittedDate: "2024-01-15",
      status: "Under Review",
      dueDate: "2024-01-31"
    },
    {
      id: "RPT-002",
      title: "Financial Expenditure Report",
      project: "Climate Change Impact Study", 
      type: "Financial Report",
      submittedBy: "Dr. Sarah Johnson",
      submittedDate: "2024-01-10",
      status: "Approved",
      dueDate: "2024-01-15"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Reports | Research Management Portal</title>
        <meta name="description" content="Generate and review technical and financial reports." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Manage technical and financial reports for all research projects.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">24</div><p className="text-sm text-muted-foreground">Total Reports</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">8</div><p className="text-sm text-muted-foreground">Under Review</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">15</div><p className="text-sm text-muted-foreground">Approved</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">3</div><p className="text-sm text-muted-foreground">Due Soon</p></CardContent></Card>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{report.project}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {report.submittedBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Submitted: {report.submittedDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant="secondary">{report.status}</Badge>
                    <Badge variant="outline" className="text-xs">{report.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
