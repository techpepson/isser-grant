import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, UserPlus, Mail, ExternalLink, BookOpen, Award, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AddResearcherForm from "@/components/forms/AddResearcherForm";

export default function Researchers() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  
  // Filter states
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [fundingRange, setFundingRange] = useState<string>("");
  const [projectCount, setProjectCount] = useState<string>("");

  const researchers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Professor of Environmental Science",
      department: "Environmental Studies",
      email: "s.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      activeProjects: 3,
      totalFunding: "$285,000",
      publications: 42,
      expertise: ["Climate Change", "Marine Biology", "Sustainability"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Associate Professor of Computer Science",
      department: "Computer Science & Engineering", 
      email: "m.chen@university.edu",
      phone: "+1 (555) 234-5678",
      activeProjects: 5,
      totalFunding: "$420,000",
      publications: 38,
      expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Assistant Professor of Engineering",
      department: "Electrical Engineering",
      email: "e.rodriguez@university.edu", 
      phone: "+1 (555) 345-6789",
      activeProjects: 2,
      totalFunding: "$180,000",
      publications: 24,
      expertise: ["Renewable Energy", "Power Systems", "Smart Grid"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Professor of Medicine",
      department: "Medical School",
      email: "j.wilson@university.edu",
      phone: "+1 (555) 456-7890", 
      activeProjects: 4,
      totalFunding: "$650,000",
      publications: 89,
      expertise: ["Oncology", "Clinical Research", "Drug Development"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      title: "Associate Professor of Psychology",
      department: "Psychology & Behavioral Sciences",
      email: "l.park@university.edu",
      phone: "+1 (555) 567-8901",
      activeProjects: 2,
      totalFunding: "$120,000", 
      publications: 31,
      expertise: ["Cognitive Psychology", "Neuroscience", "Human Behavior"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      name: "Prof. David Kumar",
      title: "Professor of Physics",
      department: "Physics & Astronomy",
      email: "d.kumar@university.edu",
      phone: "+1 (555) 678-9012",
      activeProjects: 3,
      totalFunding: "$380,000",
      publications: 67,
      expertise: ["Quantum Physics", "Theoretical Physics", "Cosmology"],
      avatar: "/api/placeholder/40/40"
    }
  ];

  // Get unique departments and expertise for filter options
  const allDepartments = [...new Set(researchers.map(r => r.department))];
  const allExpertise = [...new Set(researchers.flatMap(r => r.expertise))];

  const parseAmount = (amount: string) => {
    return parseInt(amount.replace(/[$,]/g, ''));
  };

  const filteredResearchers = researchers.filter(researcher => {
    // Search filter
    const matchesSearch = researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));

    // Department filter
    const matchesDepartment = selectedDepartments.length === 0 || 
      selectedDepartments.includes(researcher.department);

    // Expertise filter
    const matchesExpertise = selectedExpertise.length === 0 ||
      researcher.expertise.some(exp => selectedExpertise.includes(exp));

    // Funding range filter
    let matchesFunding = true;
    if (fundingRange) {
      const funding = parseAmount(researcher.totalFunding);
      switch (fundingRange) {
        case "under-100k":
          matchesFunding = funding < 100000;
          break;
        case "100k-300k":
          matchesFunding = funding >= 100000 && funding <= 300000;
          break;
        case "300k-500k":
          matchesFunding = funding >= 300000 && funding <= 500000;
          break;
        case "over-500k":
          matchesFunding = funding > 500000;
          break;
      }
    }

    // Project count filter
    let matchesProjects = true;
    if (projectCount) {
      switch (projectCount) {
        case "1-2":
          matchesProjects = researcher.activeProjects >= 1 && researcher.activeProjects <= 2;
          break;
        case "3-4":
          matchesProjects = researcher.activeProjects >= 3 && researcher.activeProjects <= 4;
          break;
        case "5+":
          matchesProjects = researcher.activeProjects >= 5;
          break;
      }
    }

    return matchesSearch && matchesDepartment && matchesExpertise && matchesFunding && matchesProjects;
  });

  const clearFilters = () => {
    setSelectedDepartments([]);
    setSelectedExpertise([]);
    setFundingRange("");
    setProjectCount("");
  };

  const hasActiveFilters = selectedDepartments.length > 0 || selectedExpertise.length > 0 || 
    fundingRange || projectCount;

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments(prev => [...prev, department]);
    } else {
      setSelectedDepartments(prev => prev.filter(d => d !== department));
    }
  };

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    if (checked) {
      setSelectedExpertise(prev => [...prev, expertise]);
    } else {
      setSelectedExpertise(prev => prev.filter(e => e !== expertise));
    }
  };

  return (
    <>
      <Helmet>
        <title>Researchers | Research Management Portal</title>
        <meta name="description" content="Browse and manage researcher profiles, affiliations, and activity." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Researchers</h1>
          <p className="text-muted-foreground">
            Manage and view researcher profiles, expertise, and project involvement.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search researchers, departments, or expertise..."
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
                      {selectedDepartments.length + selectedExpertise.length + 
                       (fundingRange ? 1 : 0) + (projectCount ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Filter Researchers</DialogTitle>
                  <DialogDescription>Filter researchers by department, expertise, and more.</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Departments */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Department</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {allDepartments.map(department => (
                        <div key={department} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dept-${department}`}
                            checked={selectedDepartments.includes(department)}
                            onCheckedChange={(checked) => 
                              handleDepartmentChange(department, checked as boolean)
                            }
                          />
                          <Label htmlFor={`dept-${department}`} className="text-sm">
                            {department}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expertise */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Expertise</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {allExpertise.map(expertise => (
                        <div key={expertise} className="flex items-center space-x-2">
                          <Checkbox
                            id={`exp-${expertise}`}
                            checked={selectedExpertise.includes(expertise)}
                            onCheckedChange={(checked) => 
                              handleExpertiseChange(expertise, checked as boolean)
                            }
                          />
                          <Label htmlFor={`exp-${expertise}`} className="text-sm">
                            {expertise}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Funding Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Total Funding</Label>
                    <Select value={fundingRange} onValueChange={setFundingRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100k">Under $100K</SelectItem>
                        <SelectItem value="100k-300k">$100K - $300K</SelectItem>
                        <SelectItem value="300k-500k">$300K - $500K</SelectItem>
                        <SelectItem value="over-500k">Over $500K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Count */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Active Projects</Label>
                    <Select value={projectCount} onValueChange={setProjectCount}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 Projects</SelectItem>
                        <SelectItem value="3-4">3-4 Projects</SelectItem>
                        <SelectItem value="5+">5+ Projects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Actions */}
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
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Researcher
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Researcher</DialogTitle>
                  <DialogDescription>Register a new researcher in the system.</DialogDescription>
                </DialogHeader>
                <AddResearcherForm onCancel={() => setOpenAddDialog(false)} onSubmit={() => setOpenAddDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{researchers.length}</div>
              <p className="text-sm text-muted-foreground">Total Researchers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {researchers.reduce((sum, r) => sum + r.activeProjects, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {researchers.reduce((sum, r) => sum + r.publications, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Publications</p>
            </CardContent>
          </Card>
        </div>

        {/* Researchers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResearchers.map((researcher) => (
            <Card key={researcher.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={researcher.avatar} alt={researcher.name} />
                    <AvatarFallback>
                      {researcher.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight">{researcher.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{researcher.title}</p>
                    <p className="text-xs text-muted-foreground">{researcher.department}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{researcher.email}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">{researcher.activeProjects}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{researcher.publications}</div>
                    <div className="text-xs text-muted-foreground">Publications</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{researcher.totalFunding}</div>
                    <div className="text-xs text-muted-foreground">Funding</div>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div>
                  <p className="text-sm font-medium mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {researcher.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResearchers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No researchers found matching your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}
