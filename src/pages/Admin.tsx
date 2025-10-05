import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Shield,
  Users,
  Activity,
  Database,
  Settings as SettingsIcon,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserPlus,
} from "lucide-react";

type Researcher = {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  onboardingDate: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "pending";
  researchInterests: string[];
  qualifications: string;
  emergencyContact: string;
  emergencyPhone: string;
};

export default function Admin() {
  const canonical = typeof window !== "undefined" ? window.location.href : "";
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedResearcher, setSelectedResearcher] =
    useState<Researcher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample researchers data
  const [researchers, setResearchers] = useState<Researcher[]>([
    {
      id: "1",
      staffId: "STAFF001",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@university.edu",
      department: "Environmental Science",
      position: "Senior Research Fellow",
      onboardingDate: "2023-01-15",
      dateOfBirth: "1985-03-22",
      phone: "+233-24-123-4567",
      address: "123 University Avenue, Accra",
      status: "active",
      researchInterests: ["Climate Change", "Ecosystems", "Sustainability"],
      qualifications: "PhD in Environmental Science, MSc in Biology",
      emergencyContact: "John Johnson",
      emergencyPhone: "+233-24-765-4321",
    },
    {
      id: "2",
      staffId: "STAFF002",
      firstName: "Prof. Michael",
      lastName: "Chen",
      email: "michael.chen@university.edu",
      department: "Computer Science",
      position: "Professor",
      onboardingDate: "2022-08-10",
      dateOfBirth: "1978-11-08",
      phone: "+233-24-234-5678",
      address: "456 Research Lane, Accra",
      status: "active",
      researchInterests: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
      ],
      qualifications: "PhD in Computer Science, MSc in Mathematics",
      emergencyContact: "Lisa Chen",
      emergencyPhone: "+233-24-876-5432",
    },
    {
      id: "3",
      staffId: "STAFF003",
      firstName: "Dr. Emily",
      lastName: "Rodriguez",
      email: "emily.rodriguez@university.edu",
      department: "Biomedical Engineering",
      position: "Research Associate",
      onboardingDate: "2024-02-01",
      dateOfBirth: "1990-07-14",
      phone: "+233-24-345-6789",
      address: "789 Innovation Street, Accra",
      status: "pending",
      researchInterests: [
        "Biomedical Devices",
        "Tissue Engineering",
        "Medical Imaging",
      ],
      qualifications:
        "PhD in Biomedical Engineering, BSc in Mechanical Engineering",
      emergencyContact: "Carlos Rodriguez",
      emergencyPhone: "+233-24-987-6543",
    },
  ]);

  const [newResearcher, setNewResearcher] = useState<Partial<Researcher>>({
    staffId: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    onboardingDate: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    status: "pending",
    researchInterests: [],
    qualifications: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  // Filter researchers based on search term
  const filteredResearchers = researchers.filter(
    (researcher) =>
      researcher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CRUD operations
  const addResearcher = () => {
    if (
      !newResearcher.staffId ||
      !newResearcher.firstName ||
      !newResearcher.lastName ||
      !newResearcher.email
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const researcher: Researcher = {
      id: Date.now().toString(),
      staffId: newResearcher.staffId!,
      firstName: newResearcher.firstName!,
      lastName: newResearcher.lastName!,
      email: newResearcher.email!,
      department: newResearcher.department || "",
      position: newResearcher.position || "",
      onboardingDate: newResearcher.onboardingDate || "",
      dateOfBirth: newResearcher.dateOfBirth || "",
      phone: newResearcher.phone || "",
      address: newResearcher.address || "",
      status: newResearcher.status || "pending",
      researchInterests: newResearcher.researchInterests || [],
      qualifications: newResearcher.qualifications || "",
      emergencyContact: newResearcher.emergencyContact || "",
      emergencyPhone: newResearcher.emergencyPhone || "",
    };

    setResearchers([...researchers, researcher]);
    setNewResearcher({
      staffId: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
      onboardingDate: "",
      dateOfBirth: "",
      phone: "",
      address: "",
      status: "pending",
      researchInterests: [],
      qualifications: "",
      emergencyContact: "",
      emergencyPhone: "",
    });
    setShowAddDialog(false);
    alert("Researcher added successfully!");
  };

  const updateResearcher = () => {
    if (!selectedResearcher) return;

    setResearchers(
      researchers.map((r) =>
        r.id === selectedResearcher.id ? selectedResearcher : r
      )
    );
    setShowEditDialog(false);
    setSelectedResearcher(null);
    alert("Researcher updated successfully!");
  };

  const deleteResearcher = (id: string) => {
    setResearchers(researchers.filter((r) => r.id !== id));
    alert("Researcher deleted successfully!");
  };

  const openEditDialog = (researcher: Researcher) => {
    setSelectedResearcher({ ...researcher });
    setShowEditDialog(true);
  };

  const openViewDialog = (researcher: Researcher) => {
    setSelectedResearcher(researcher);
    setShowViewDialog(true);
  };

  return (
    <>
      <Helmet>
        <title>Admin | Research Management Portal</title>
        <meta
          name="description"
          content="System administration, roles, and configuration overview."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            System Administration
          </h1>
          <p className="text-muted-foreground">
            Manage users, system health, and administrative functions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-sm text-muted-foreground">System Health</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">2.3TB</div>
              <p className="text-sm text-muted-foreground">Storage Used</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage user accounts, roles, and permissions
              </p>
              <Button
                className="w-full"
                onClick={() => setShowUserManagement(!showUserManagement)}
              >
                {showUserManagement ? "Hide User Management" : "Manage Users"}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor system performance and health metrics
              </p>
              <Button className="w-full">View Health Dashboard</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Backup, restore, and manage system data
              </p>
              <Button className="w-full">Data Tools</Button>
            </CardContent>
          </Card>
        </div>

        {/* User Management Interface */}
        {showUserManagement && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Researcher Management
                </CardTitle>
                <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New Researcher
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Researcher</DialogTitle>
                      <DialogDescription>
                        Enter the researcher's details to add them to the
                        system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="staffId">Staff ID *</Label>
                          <Input
                            id="staffId"
                            value={newResearcher.staffId || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                staffId: e.target.value,
                              })
                            }
                            placeholder="e.g., STAFF001"
                          />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <select
                            className="w-full h-10 rounded border px-3 text-sm bg-background"
                            value={newResearcher.status || "pending"}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                status: e.target.value as
                                  | "active"
                                  | "inactive"
                                  | "pending",
                              })
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={newResearcher.firstName || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                firstName: e.target.value,
                              })
                            }
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={newResearcher.lastName || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                lastName: e.target.value,
                              })
                            }
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newResearcher.email || ""}
                          onChange={(e) =>
                            setNewResearcher({
                              ...newResearcher,
                              email: e.target.value,
                            })
                          }
                          placeholder="researcher@university.edu"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={newResearcher.department || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                department: e.target.value,
                              })
                            }
                            placeholder="e.g., Computer Science"
                          />
                        </div>
                        <div>
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={newResearcher.position || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                position: e.target.value,
                              })
                            }
                            placeholder="e.g., Professor"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="onboardingDate">
                            Onboarding Date
                          </Label>
                          <Input
                            id="onboardingDate"
                            type="date"
                            value={newResearcher.onboardingDate || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                onboardingDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={newResearcher.dateOfBirth || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                dateOfBirth: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newResearcher.phone || ""}
                          onChange={(e) =>
                            setNewResearcher({
                              ...newResearcher,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+233-24-123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={newResearcher.address || ""}
                          onChange={(e) =>
                            setNewResearcher({
                              ...newResearcher,
                              address: e.target.value,
                            })
                          }
                          placeholder="Enter full address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="qualifications">Qualifications</Label>
                        <Textarea
                          id="qualifications"
                          value={newResearcher.qualifications || ""}
                          onChange={(e) =>
                            setNewResearcher({
                              ...newResearcher,
                              qualifications: e.target.value,
                            })
                          }
                          placeholder="e.g., PhD in Computer Science, MSc in Mathematics"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="emergencyContact">
                            Emergency Contact
                          </Label>
                          <Input
                            id="emergencyContact"
                            value={newResearcher.emergencyContact || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                emergencyContact: e.target.value,
                              })
                            }
                            placeholder="Emergency contact name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyPhone">
                            Emergency Phone
                          </Label>
                          <Input
                            id="emergencyPhone"
                            value={newResearcher.emergencyPhone || ""}
                            onChange={(e) =>
                              setNewResearcher({
                                ...newResearcher,
                                emergencyPhone: e.target.value,
                              })
                            }
                            placeholder="+233-24-765-4321"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={addResearcher} className="flex-1">
                          Add Researcher
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddDialog(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-4">
                <Input
                  placeholder="Search researchers by name, staff ID, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Researchers List */}
              <div className="space-y-3">
                {filteredResearchers.map((researcher) => (
                  <div key={researcher.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-medium">
                              {researcher.firstName} {researcher.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {researcher.email}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {researcher.staffId}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {researcher.department}
                              </Badge>
                              <Badge
                                variant={
                                  researcher.status === "active"
                                    ? "default"
                                    : researcher.status === "inactive"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {researcher.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openViewDialog(researcher)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(researcher)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Researcher
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete{" "}
                                {researcher.firstName} {researcher.lastName}?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteResearcher(researcher.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Researcher Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Researcher</DialogTitle>
              <DialogDescription>
                Update the researcher's information.
              </DialogDescription>
            </DialogHeader>
            {selectedResearcher && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-staffId">Staff ID</Label>
                    <Input
                      id="edit-staffId"
                      value={selectedResearcher.staffId}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          staffId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <select
                      className="w-full h-10 rounded border px-3 text-sm bg-background"
                      value={selectedResearcher.status}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          status: e.target.value as
                            | "active"
                            | "inactive"
                            | "pending",
                        })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-firstName">First Name</Label>
                    <Input
                      id="edit-firstName"
                      value={selectedResearcher.firstName}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-lastName">Last Name</Label>
                    <Input
                      id="edit-lastName"
                      value={selectedResearcher.lastName}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedResearcher.email}
                    onChange={(e) =>
                      setSelectedResearcher({
                        ...selectedResearcher,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-department">Department</Label>
                    <Input
                      id="edit-department"
                      value={selectedResearcher.department}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          department: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-position">Position</Label>
                    <Input
                      id="edit-position"
                      value={selectedResearcher.position}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          position: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-onboardingDate">Onboarding Date</Label>
                    <Input
                      id="edit-onboardingDate"
                      type="date"
                      value={selectedResearcher.onboardingDate}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          onboardingDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
                    <Input
                      id="edit-dateOfBirth"
                      type="date"
                      value={selectedResearcher.dateOfBirth}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={selectedResearcher.phone}
                    onChange={(e) =>
                      setSelectedResearcher({
                        ...selectedResearcher,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-address">Address</Label>
                  <Textarea
                    id="edit-address"
                    value={selectedResearcher.address}
                    onChange={(e) =>
                      setSelectedResearcher({
                        ...selectedResearcher,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-qualifications">Qualifications</Label>
                  <Textarea
                    id="edit-qualifications"
                    value={selectedResearcher.qualifications}
                    onChange={(e) =>
                      setSelectedResearcher({
                        ...selectedResearcher,
                        qualifications: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-emergencyContact">
                      Emergency Contact
                    </Label>
                    <Input
                      id="edit-emergencyContact"
                      value={selectedResearcher.emergencyContact}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          emergencyContact: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-emergencyPhone">Emergency Phone</Label>
                    <Input
                      id="edit-emergencyPhone"
                      value={selectedResearcher.emergencyPhone}
                      onChange={(e) =>
                        setSelectedResearcher({
                          ...selectedResearcher,
                          emergencyPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={updateResearcher} className="flex-1">
                    Update Researcher
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Researcher Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Researcher Details</DialogTitle>
              <DialogDescription>
                View complete information for this researcher.
              </DialogDescription>
            </DialogHeader>
            {selectedResearcher && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Staff ID</Label>
                    <p className="text-sm">{selectedResearcher.staffId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge
                      variant={
                        selectedResearcher.status === "active"
                          ? "default"
                          : selectedResearcher.status === "inactive"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {selectedResearcher.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">First Name</Label>
                    <p className="text-sm">{selectedResearcher.firstName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Name</Label>
                    <p className="text-sm">{selectedResearcher.lastName}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedResearcher.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm">{selectedResearcher.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <p className="text-sm">{selectedResearcher.position}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Onboarding Date
                    </Label>
                    <p className="text-sm">
                      {selectedResearcher.onboardingDate}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date of Birth</Label>
                    <p className="text-sm">{selectedResearcher.dateOfBirth}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm">{selectedResearcher.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Address</Label>
                  <p className="text-sm">{selectedResearcher.address}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Qualifications</Label>
                  <p className="text-sm">{selectedResearcher.qualifications}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Research Interests
                  </Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedResearcher.researchInterests.map(
                      (interest, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {interest}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Emergency Contact
                    </Label>
                    <p className="text-sm">
                      {selectedResearcher.emergencyContact}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Emergency Phone
                    </Label>
                    <p className="text-sm">
                      {selectedResearcher.emergencyPhone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowViewDialog(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setShowViewDialog(false);
                      openEditDialog(selectedResearcher);
                    }}
                  >
                    Edit Researcher
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
