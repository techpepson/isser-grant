import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Search, 
  Filter,
  Calendar,
  Receipt,
  CreditCard,
  Download
} from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  projectTitle: string;
  principalInvestigator: string;
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: string;
  description: string;
  status: string;
  category?: string;
  approvedBy?: string;
  receiptNumber?: string;
}

interface TransactionHistoryModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionHistoryModal({ project, isOpen, onClose }: TransactionHistoryModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  if (!project) return null;

  // Mock transaction history for the specific project
  const transactions: Transaction[] = [
    {
      id: "TXN-2024-001",
      date: "2024-01-28",
      type: "Disbursement",
      amount: "$15,000",
      description: "Quarterly funding disbursement - Q1 2024",
      status: "Completed",
      category: "Funding",
      approvedBy: "Finance Director",
      receiptNumber: "RCP-2024-001"
    },
    {
      id: "TXN-2024-007",
      date: "2024-01-25",
      type: "Expense",
      amount: "$2,500",
      description: "High-performance computing cluster access",
      status: "Completed",
      category: "Equipment",
      approvedBy: "Prof. Michael Chen",
      receiptNumber: "RCP-2024-007"
    },
    {
      id: "TXN-2024-013",
      date: "2024-01-20",
      type: "Expense",
      amount: "$1,200",
      description: "Research materials and chemical reagents",
      status: "Approved",
      category: "Supplies",
      approvedBy: "Prof. Michael Chen",
      receiptNumber: "RCP-2024-013"
    },
    {
      id: "TXN-2023-089",
      date: "2023-12-15",
      type: "Disbursement",
      amount: "$25,000",
      description: "Initial project funding disbursement",
      status: "Completed",
      category: "Funding",
      approvedBy: "Finance Director",
      receiptNumber: "RCP-2023-089"
    },
    {
      id: "TXN-2023-076",
      date: "2023-12-10",
      type: "Expense",
      amount: "$3,800",
      description: "Conference registration and travel - NeurIPS 2023",
      status: "Completed",
      category: "Travel",
      approvedBy: "Prof. Michael Chen",
      receiptNumber: "RCP-2023-076"
    },
    {
      id: "TXN-2023-065",
      date: "2023-11-28",
      type: "Expense",
      amount: "$950",
      description: "Software licenses for data analysis tools",
      status: "Completed",
      category: "Software",
      approvedBy: "Prof. Michael Chen",
      receiptNumber: "RCP-2023-065"
    },
    {
      id: "TXN-2023-052",
      date: "2023-11-15",
      type: "Expense",
      amount: "$4,200",
      description: "Laboratory equipment maintenance",
      status: "Pending",
      category: "Maintenance",
      approvedBy: "Pending",
      receiptNumber: "RCP-2023-052"
    }
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Approved":
        return "secondary";
      case "Pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Funding":
        return <CreditCard className="h-3 w-3" />;
      case "Travel":
        return <Calendar className="h-3 w-3" />;
      default:
        return <Receipt className="h-3 w-3" />;
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate totals
  const totalDisbursements = transactions
    .filter(t => t.type === "Disbursement")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[$,]/g, "")), 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === "Expense" && t.status === "Completed")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[$,]/g, "")), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Transaction History: {project.projectTitle}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Project ID: {project.id} • Principal Investigator: {project.principalInvestigator}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-semibold text-green-600">
                  ${totalDisbursements.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Total Disbursements</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-semibold text-red-600">
                  ${totalExpenses.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-semibold">
                  {filteredTransactions.length}
                </div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Disbursement">Disbursements</SelectItem>
                <SelectItem value="Expense">Expenses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{transaction.description}</h4>
                          <Badge 
                            variant={transaction.type === "Disbursement" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {transaction.type}
                          </Badge>
                          {transaction.category && (
                            <Badge variant="outline" className="text-xs">
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(transaction.category)}
                                {transaction.category}
                              </div>
                            </Badge>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <p>Transaction ID: {transaction.id}</p>
                          <p>Receipt: {transaction.receiptNumber}</p>
                          <p>Date: {transaction.date}</p>
                          <p>Approved by: {transaction.approvedBy}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${
                        transaction.type === "Disbursement" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "Disbursement" ? "+" : "-"}{transaction.amount}
                      </div>
                      <Badge 
                        variant={getStatusColor(transaction.status)}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found matching your search criteria.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}