import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Trophy, 
  DollarSign, 
  Calendar, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  Target,
  ExternalLink
} from "lucide-react";
import NewAwardForm from "@/components/forms/NewAwardForm";

export default function Awards() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  const [searchTerm, setSearchTerm] = useState("");
  const [openNewAwardDialog, setOpenNewAwardDialog] = useState(false);

  const awards = [
    {
      id: "AWD-2024-001",
      projectTitle: "AI-Driven Drug Discovery Platform",
      principalInvestigator: {
        name: "Prof. Michael Chen",
        department: "Computer Science",
        avatar: "/api/placeholder/32/32"
      },
      fundingCall: "NIH Biomedical Research Excellence",
      awardAmount: "$120,000",
      duration: "24 months",
      startDate: "2024-02-01",
      endDate: "2026-01-31",
      status: "Active",
      progress: 25,
      nextMilestone: "Phase I Testing Complete",
      nextDeadline: "2024-06-30",
      teamSize: 5,
      publications: 2,
      description: "Development of AI algorithms for accelerating drug discovery processes"
    },
    {
      id: "AWD-2023-008",
      projectTitle: "Climate Change Impact on Coastal Ecosystems",
      principalInvestigator: {
        name: "Dr. Sarah Johnson", 
        department: "Environmental Studies",
        avatar: "/api/placeholder/32/32"
      },
      fundingCall: "NSF Climate Research Initiative",
      awardAmount: "$85,000",
      duration: "18 months",
      startDate: "2023-09-01",
      endDate: "2025-02-28",
      status: "Active",
      progress: 65,
      nextMilestone: "Final Data Collection",
      nextDeadline: "2024-12-15",
      teamSize: 3,
      publications: 4,
      description: "Comprehensive study of climate change effects on marine biodiversity"
    },
    {
      id: "AWD-2023-015",
      projectTitle: "Renewable Energy Storage Solutions",
      principalInvestigator: {
        name: "Dr. Emily Rodriguez",
        department: "Electrical Engineering", 
        avatar: "/api/placeholder/32/32"
      },
      fundingCall: "DOE Clean Energy Initiative",
      awardAmount: "$95,000",
      duration: "30 months",
      startDate: "2023-06-01",
      endDate: "2025-11-30",
      status: "Active",
      progress: 45,
      nextMilestone: "Prototype Testing",
      nextDeadline: "2024-09-30",
      teamSize: 4,
      publications: 1,
      description: "Novel approaches to energy storage using advanced battery technologies"
    },
    {
      id: "AWD-2022-023",
      projectTitle: "Quantum Computing Architecture Research", 
      principalInvestigator: {
        name: "Prof. David Kumar",
        department: "Physics & Astronomy",
        avatar: "/api/placeholder/32/32"
      },
      fundingCall: "DARPA Quantum Initiative",
      awardAmount: "$450,000",
      duration: "36 months",
      startDate: "2022-10-01",
      endDate: "2025-09-30",
      status: "Active",
      progress: 80,
      nextMilestone: "Technology Transfer",
      nextDeadline: "2024-03-31",
      teamSize: 8,
      publications: 12,
      description: "Development of scalable quantum computing architectures for cryptography"
    },
    {
      id: "AWD-2023-031",
      projectTitle: "Cognitive Learning Assessment Tools",
      principalInvestigator: {
        name: "Dr. Lisa Park",
        department: "Psychology",
        avatar: "/api/placeholder/32/32"
      },
      fundingCall: "Education Innovation Grant",
      awardAmount: "$75,000",
      duration: "12 months", 
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      status: "Completed",
      progress: 100,
      nextMilestone: "Project Complete",
      nextDeadline: "N/A",
      teamSize: 2,
      publications: 3,
      description: "Development of AI-powered tools for assessing cognitive learning outcomes"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Completed":
        return "secondary";
      case "On Hold":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredAwards = awards.filter(award =>
    award.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    award.principalInvestigator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    award.fundingCall.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeAwards = filteredAwards.filter(award => award.status === "Active");
  const completedAwards = filteredAwards.filter(award => award.status === "Completed");

  return (
    <>
      <Helmet>
        <title>Awards | Research Management Portal</title>
        <meta name="description" content="Review awarded projects, funding amounts, and progress." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Awards</h1>
          <p className="text-muted-foreground">
            Track active and completed research projects with their progress and milestones.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects, investigators, or calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Dialog open={openNewAwardDialog} onOpenChange={setOpenNewAwardDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Trophy className="h-4 w-4 mr-2" />
                  New Award
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Award</DialogTitle>
                  <DialogDescription>Create a new research award from an approved application.</DialogDescription>
                </DialogHeader>
                <NewAwardForm onCancel={() => setOpenNewAwardDialog(false)} onSubmit={() => setOpenNewAwardDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{activeAwards.length}</div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{completedAwards.length}</div>
              <p className="text-sm text-muted-foreground">Completed Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                ${(awards.reduce((sum, award) => 
                  sum + parseInt(award.awardAmount.replace(/[$,]/g, "")), 0) / 1000).toFixed(0)}K
              </div>
              <p className="text-sm text-muted-foreground">Total Funding</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {awards.reduce((sum, award) => sum + award.publications, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Publications</p>
            </CardContent>
          </Card>
        </div>

        {/* Awards Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Projects ({activeAwards.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedAwards.length})</TabsTrigger>
            <TabsTrigger value="all">All Awards ({filteredAwards.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeAwards.map((award) => (
              <Card key={award.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={award.principalInvestigator.avatar} />
                          <AvatarFallback>
                            {award.principalInvestigator.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{award.projectTitle}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {award.principalInvestigator.name} • {award.principalInvestigator.department}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          {award.id}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {award.awardAmount}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {award.teamSize} team members
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <Badge variant={getStatusColor(award.status)}>
                        {award.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Progress: {award.progress}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription>{award.description}</CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Progress</span>
                      <span>{award.progress}%</span>
                    </div>
                    <Progress value={award.progress} className="w-full" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Project Timeline</h4>
                      <div className="space-y-1 text-sm">
                        <div>Duration: <span className="font-medium">{award.duration}</span></div>
                        <div>Started: <span className="font-medium">{award.startDate}</span></div>
                        <div>Ends: <span className="font-medium">{award.endDate}</span></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Next Milestone</h4>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium">{award.nextMilestone}</div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Due: {award.nextDeadline}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>Publications: {award.publications}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Manage Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedAwards.map((award) => (
              <Card key={award.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{award.projectTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        {award.principalInvestigator.name} • {award.awardAmount} • {award.publications} publications
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Completed</Badge>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">100%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAwards.map((award) => (
                <Card key={award.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg leading-tight">{award.projectTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground">{award.principalInvestigator.name}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <Badge variant={getStatusColor(award.status)}>{award.status}</Badge>
                    </div>
                    <Progress value={award.progress} className="w-full" />
                    <div className="flex justify-between text-sm">
                      <span>Funding: {award.awardAmount}</span>
                      <span>Pubs: {award.publications}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
