import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, DollarSign, Target, TrendingUp, Building, Clock } from "lucide-react";

interface Project {
  id: string;
  projectTitle: string;
  principalInvestigator: string;
  totalBudget: string;
  disbursed: string;
  expended: string;
  remaining: string;
  utilizationRate: number;
  status: string;
}

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "default";
      case "High Utilization":
        return "secondary";
      case "Over Budget":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Mock additional project details
  const projectDetails = {
    description: "Advanced artificial intelligence research focused on accelerating drug discovery through machine learning algorithms and computational biology techniques.",
    startDate: "2024-01-15",
    endDate: "2025-12-31",
    department: "Computer Science & Biology",
    fundingAgency: "National Science Foundation",
    category: "Research & Development",
    collaborators: ["Dr. Lisa Wang", "Prof. James Thompson", "Dr. Maria Rodriguez"],
    objectives: [
      "Develop ML algorithms for molecular analysis",
      "Create predictive models for drug efficacy",
      "Establish collaboration with pharmaceutical companies",
      "Publish findings in peer-reviewed journals"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Building className="h-5 w-5" />
            Project Details: {project.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.projectTitle}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {projectDetails.description}
                  </p>
                </div>
                <Badge variant={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Principal Investigator:</strong> {project.principalInvestigator}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Department:</strong> {projectDetails.department}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Start Date:</strong> {projectDetails.startDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>End Date:</strong> {projectDetails.endDate}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium mb-2">Funding Agency</p>
                <p className="text-sm text-muted-foreground">{projectDetails.fundingAgency}</p>
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.totalBudget}</div>
                  <p className="text-xs text-muted-foreground">Total Budget</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{project.disbursed}</div>
                  <p className="text-xs text-muted-foreground">Disbursed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{project.expended}</div>
                  <p className="text-xs text-muted-foreground">Expended</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{project.remaining}</div>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Budget Utilization</span>
                  <span>{project.utilizationRate}%</span>
                </div>
                <Progress value={project.utilizationRate} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {project.utilizationRate > 80 ? "High utilization - monitor closely" :
                   project.utilizationRate > 60 ? "Moderate utilization" : "Low utilization"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Project Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Project Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {projectDetails.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Collaborators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Key Collaborators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {projectDetails.collaborators.map((collaborator, index) => (
                  <Badge key={index} variant="outline">
                    {collaborator}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}