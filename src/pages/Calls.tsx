import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Calendar, DollarSign, Users, ExternalLink, Clock, Building } from "lucide-react";

export default function Calls() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  const [searchTerm, setSearchTerm] = useState("");

  const fundingCalls = [
    {
      id: "NSF-2024-001",
      title: "National Science Foundation Research Grant Program",
      funder: "National Science Foundation",
      theme: "Basic Research",
      totalFunding: "$5,000,000",
      maxAward: "$250,000",
      deadline: "2024-03-15",
      status: "Active",
      applications: 45,
      description: "Support for fundamental research in all areas of science and engineering.",
      eligibility: ["Faculty at accredited institutions", "PhD holders", "Collaborative teams"],
      keywords: ["Basic Research", "Innovation", "STEM Education"]
    },
    {
      id: "NIH-2024-002", 
      title: "Biomedical Research Excellence Program",
      funder: "National Institutes of Health",
      theme: "Health & Medicine",
      totalFunding: "$8,000,000",
      maxAward: "$400,000",
      deadline: "2024-04-01",
      status: "Active",
      applications: 32,
      description: "Advancing biomedical research with focus on translational medicine.",
      eligibility: ["Medical researchers", "PhD in life sciences", "Clinical investigators"],
      keywords: ["Biomedical", "Translational Research", "Clinical Trials"]
    },
    {
      id: "DOE-2024-003",
      title: "Clean Energy Innovation Initiative",
      funder: "Department of Energy", 
      theme: "Energy & Environment",
      totalFunding: "$10,000,000",
      maxAward: "$500,000",
      deadline: "2024-05-20",
      status: "Active",
      applications: 28,
      description: "Research and development of next-generation clean energy technologies.",
      eligibility: ["Energy researchers", "Engineering faculty", "Industry partnerships"],
      keywords: ["Clean Energy", "Sustainability", "Climate Change"]
    },
    {
      id: "EPA-2024-004",
      title: "Environmental Sustainability Research",
      funder: "Environmental Protection Agency",
      theme: "Environment",
      totalFunding: "$3,000,000", 
      maxAward: "$150,000",
      deadline: "2024-02-28",
      status: "Closing Soon",
      applications: 67,
      description: "Research on environmental protection and sustainability solutions.",
      eligibility: ["Environmental scientists", "Policy researchers", "Community organizations"],
      keywords: ["Environment", "Sustainability", "Policy Research"]
    },
    {
      id: "DARPA-2024-005",
      title: "Defense Advanced Research Projects",
      funder: "Defense Advanced Research Projects Agency",
      theme: "Defense & Security",
      totalFunding: "$15,000,000",
      maxAward: "$1,000,000", 
      deadline: "2024-06-30",
      status: "Opening Soon",
      applications: 0,
      description: "Revolutionary research for national security applications.",
      eligibility: ["US citizens only", "Security clearance required", "Advanced degrees preferred"],
      keywords: ["Defense Technology", "National Security", "Innovation"]
    },
    {
      id: "ED-2024-006",
      title: "Educational Research and Development",
      funder: "Department of Education",
      theme: "Education",
      totalFunding: "$2,500,000",
      maxAward: "$125,000",
      deadline: "2024-07-15",
      status: "Planning",
      applications: 0,
      description: "Innovative approaches to educational challenges and learning outcomes.",
      eligibility: ["Education researchers", "K-12 partnerships", "Higher education faculty"],
      keywords: ["Education Research", "Learning Outcomes", "Educational Technology"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Closing Soon":
        return "destructive";
      case "Opening Soon":
        return "secondary";
      case "Planning":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredCalls = fundingCalls.filter(call =>
    call.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.funder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeCalls = filteredCalls.filter(call => call.status === "Active" || call.status === "Closing Soon");
  const upcomingCalls = filteredCalls.filter(call => call.status === "Opening Soon" || call.status === "Planning");

  return (
    <>
      <Helmet>
        <title>Funding Calls | Research Management Portal</title>
        <meta name="description" content="View active and upcoming funding calls with key details and deadlines." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Funding Calls</h1>
          <p className="text-muted-foreground">
            Explore current and upcoming funding opportunities for your research.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search calls, funders, or themes..."
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
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{activeCalls.length}</div>
              <p className="text-sm text-muted-foreground">Active Calls</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{upcomingCalls.length}</div>
              <p className="text-sm text-muted-foreground">Upcoming Calls</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                ${(fundingCalls.reduce((sum, call) => 
                  sum + parseInt(call.totalFunding.replace(/[$,]/g, "")), 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-sm text-muted-foreground">Total Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {fundingCalls.reduce((sum, call) => sum + call.applications, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Applications Submitted</p>
            </CardContent>
          </Card>
        </div>

        {/* Calls Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Calls ({activeCalls.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Calls ({upcomingCalls.length})</TabsTrigger>
            <TabsTrigger value="all">All Calls ({filteredCalls.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeCalls.map((call) => (
              <Card key={call.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{call.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {call.funder}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          Max Award: {call.maxAward}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {call.applications} applications
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={getStatusColor(call.status)}>
                        {call.status}
                      </Badge>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Due: {call.deadline}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <Clock className="h-4 w-4" />
                          {getDaysUntilDeadline(call.deadline)} days left
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{call.description}</CardDescription>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Funding Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>Total Available: <span className="font-medium">{call.totalFunding}</span></div>
                        <div>Maximum Award: <span className="font-medium">{call.maxAward}</span></div>
                        <div>Theme: <span className="font-medium">{call.theme}</span></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Eligibility</h4>
                      <ul className="text-sm space-y-1">
                        {call.eligibility.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {call.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button>
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingCalls.map((call) => (
              <Card key={call.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{call.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {call.funder}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          Max Award: {call.maxAward}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={getStatusColor(call.status)}>
                        {call.status}
                      </Badge>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Opens: {call.deadline}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{call.description}</CardDescription>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" disabled>
                      Not Yet Available
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {filteredCalls.map((call) => (
              <Card key={call.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{call.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {call.funder}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {call.totalFunding}
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(call.status)}>
                      {call.status}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
