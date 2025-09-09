import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ProjectDetailsModal } from "@/components/finance/ProjectDetailsModal";
import { TransactionHistoryModal } from "@/components/finance/TransactionHistoryModal";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Receipt, 
  CreditCard,
  Building,
  AlertTriangle,
  CheckCircle,
  Download,
  FileText
} from "lucide-react";

export default function Finance() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  
  // Modal state management
  const [selectedProject, setSelectedProject] = useState<typeof projectBudgets[0] | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleViewDetails = (project: typeof projectBudgets[0]) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleViewTransactionHistory = (project: typeof projectBudgets[0]) => {
    setSelectedProject(project);
    setIsTransactionModalOpen(true);
  };

  const budgetOverview = {
    totalAllocated: "$2,400,000",
    totalDisbursed: "$1,650,000",
    totalExpended: "$1,420,000",
    remaining: "$980,000",
    utilizationRate: 69
  };

  const projectBudgets = [
    {
      id: "AWD-2024-001",
      projectTitle: "AI-Driven Drug Discovery Platform",
      principalInvestigator: "Prof. Michael Chen",
      totalBudget: "$120,000",
      disbursed: "$60,000",
      expended: "$45,000",
      remaining: "$75,000",
      utilizationRate: 37.5,
      status: "On Track"
    },
    {
      id: "AWD-2023-008", 
      projectTitle: "Climate Change Impact Study",
      principalInvestigator: "Dr. Sarah Johnson",
      totalBudget: "$85,000",
      disbursed: "$85,000",
      expended: "$72,000",
      remaining: "$13,000",
      utilizationRate: 85,
      status: "High Utilization"
    },
    {
      id: "AWD-2023-015",
      projectTitle: "Renewable Energy Storage",
      principalInvestigator: "Dr. Emily Rodriguez", 
      totalBudget: "$95,000",
      disbursed: "$47,500",
      expended: "$38,000",
      remaining: "$57,000",
      utilizationRate: 40,
      status: "On Track"
    },
    {
      id: "AWD-2022-023",
      projectTitle: "Quantum Computing Research",
      principalInvestigator: "Prof. David Kumar",
      totalBudget: "$450,000",
      disbursed: "$360,000",
      expended: "$340,000",
      remaining: "$110,000",
      utilizationRate: 76,
      status: "On Track"
    }
  ];

  const recentTransactions = [
    {
      id: "TXN-2024-001",
      date: "2024-01-28",
      type: "Disbursement",
      project: "AI-Driven Drug Discovery Platform",
      amount: "$15,000",
      description: "Quarterly funding disbursement",
      status: "Completed"
    },
    {
      id: "TXN-2024-002",
      date: "2024-01-25",
      type: "Expense", 
      project: "Climate Change Impact Study",
      amount: "$3,200",
      description: "Research equipment purchase",
      status: "Approved"
    },
    {
      id: "TXN-2024-003",
      date: "2024-01-22",
      type: "Expense",
      project: "Quantum Computing Research", 
      amount: "$8,500",
      description: "Conference travel and registration",
      status: "Pending"
    },
    {
      id: "TXN-2024-004",
      date: "2024-01-20",
      type: "Disbursement",
      project: "Renewable Energy Storage",
      amount: "$23,750",
      description: "Initial funding disbursement",
      status: "Completed"
    },
    {
      id: "TXN-2024-005",
      date: "2024-01-18",
      type: "Expense",
      project: "Climate Change Impact Study",
      amount: "$1,800",
      description: "Laboratory supplies",
      status: "Completed"
    }
  ];

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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "Disbursement":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "Expense":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Finance | Research Management Portal</title>
        <meta name="description" content="Financial overview of budgets, disbursements, and expenses." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Finance</h1>
          <p className="text-muted-foreground">
            Monitor project budgets, track expenses, and manage financial allocations.
          </p>
        </div>

        {/* Financial Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{budgetOverview.totalAllocated}</div>
              <p className="text-sm text-muted-foreground">Total Allocated</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{budgetOverview.totalDisbursed}</div>
              <p className="text-sm text-muted-foreground">Total Disbursed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">{budgetOverview.totalExpended}</div>
              <p className="text-sm text-muted-foreground">Total Expended</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{budgetOverview.remaining}</div>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{budgetOverview.utilizationRate}%</div>
              <p className="text-sm text-muted-foreground">Utilization Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="budgets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="budgets">Project Budgets</TabsTrigger>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="budgets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Project Budget Overview</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Budget Report
              </Button>
            </div>
            
            {projectBudgets.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.projectTitle}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {project.principalInvestigator} • {project.id}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-semibold text-blue-600">{project.totalBudget}</div>
                      <p className="text-xs text-muted-foreground">Total Budget</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold text-green-600">{project.disbursed}</div>
                      <p className="text-xs text-muted-foreground">Disbursed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold text-orange-600">{project.expended}</div>
                      <p className="text-xs text-muted-foreground">Expended</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">{project.remaining}</div>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilization</span>
                      <span>{project.utilizationRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          project.utilizationRate > 80 ? 'bg-red-500' :
                          project.utilizationRate > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${project.utilizationRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(project)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewTransactionHistory(project)}
                    >
                      Transaction History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Financial Transactions</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Transactions
              </Button>
            </div>

            {recentTransactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{transaction.description}</h4>
                          <Badge 
                            variant={transaction.type === "Disbursement" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {transaction.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.project}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date} • {transaction.id}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${
                        transaction.type === "Disbursement" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "Disbursement" ? "+" : "-"}{transaction.amount}
                      </div>
                      <Badge 
                        variant={
                          transaction.status === "Completed" ? "default" :
                          transaction.status === "Approved" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center">
              <Button variant="outline">
                Load More Transactions
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Budget Summary Report
                  </CardTitle>
                  <CardDescription>
                    Comprehensive overview of all project budgets and allocations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Expense Report
                  </CardTitle>
                  <CardDescription>
                    Detailed breakdown of expenses by project and category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Disbursement Report
                  </CardTitle>
                  <CardDescription>
                    Summary of all funding disbursements to projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Financial Analytics
                  </CardTitle>
                  <CardDescription>
                    Trends and analytics on spending patterns and utilization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Funder Report
                  </CardTitle>
                  <CardDescription>
                    Financial reporting organized by funding agency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Budget Alerts
                  </CardTitle>
                  <CardDescription>
                    Projects requiring financial attention or approaching limits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
        
        <TransactionHistoryModal
          project={selectedProject}
          isOpen={isTransactionModalOpen}
          onClose={() => setIsTransactionModalOpen(false)}
        />
      </div>
    </>
  );
}
