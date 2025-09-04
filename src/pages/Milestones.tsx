import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flag, Calendar, Clock, CheckCircle, AlertTriangle, User } from "lucide-react";

export default function Milestones() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  
  const milestones = [
    {
      id: "MS-001",
      title: "Phase I Testing Complete",
      project: "AI-Driven Drug Discovery Platform",
      assignee: "Prof. Michael Chen",
      dueDate: "2024-06-30",
      status: "In Progress",
      progress: 75,
      description: "Complete initial testing phase for AI algorithms"
    },
    {
      id: "MS-002", 
      title: "Final Data Collection",
      project: "Climate Change Impact Study",
      assignee: "Dr. Sarah Johnson",
      dueDate: "2024-12-15",
      status: "Not Started",
      progress: 0,
      description: "Collect final round of environmental data"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Milestones | Research Management Portal</title>
        <meta name="description" content="Track project milestones, progress, and due dates." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Milestones</h1>
          <p className="text-muted-foreground">Track project milestones and deliverables across all research projects.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">12</div><p className="text-sm text-muted-foreground">Active Milestones</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">8</div><p className="text-sm text-muted-foreground">Completed This Month</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold">3</div><p className="text-sm text-muted-foreground">Overdue</p></CardContent></Card>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{milestone.project}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {milestone.assignee}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due: {milestone.dueDate}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{milestone.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
