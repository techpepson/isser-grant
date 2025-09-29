import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, FilePlus2, Award as AwardIcon, FileText, DollarSign, BarChart3, CalendarDays, Flag } from "lucide-react";

export default function ResearcherPortal() {
  const canonical = typeof window !== 'undefined' ? window.location.href : '';
  const [activeTab, setActiveTab] = useState("new-application");

  return (
    <>
      <Helmet>
        <title>Researcher Portal | Research Management Portal</title>
        <meta name="description" content="Researcher workspace with applications, awards, finance, calendar, and milestones." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Researcher Portal</h1>
          <p className="text-muted-foreground">Your workspace for managing applications, awards, finances, and milestones.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <Button variant={activeTab === "new-application" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("new-application")}>
              <FilePlus2 className="h-4 w-4 mr-2" /> New Application
            </Button>
            <Button variant={activeTab === "add-award" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("add-award")}>
              <AwardIcon className="h-4 w-4 mr-2" /> Add Award
            </Button>
            <Button variant={activeTab === "apply-call" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("apply-call")}>
              <FileText className="h-4 w-4 mr-2" /> Apply for a Call
            </Button>
            <Button variant={activeTab === "reports" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("reports")}>
              <BarChart3 className="h-4 w-4 mr-2" /> Financial Reports
            </Button>
            <Button variant={activeTab === "finance" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("finance")}>
              <DollarSign className="h-4 w-4 mr-2" /> Finance
            </Button>
            <Button variant={activeTab === "calendar" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("calendar")}>
              <CalendarIcon className="h-4 w-4 mr-2" /> Calendar
            </Button>
            <Button variant={activeTab === "add-milestone" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("add-milestone")}>
              <Flag className="h-4 w-4 mr-2" /> Add Milestone
            </Button>
          </aside>

          {/* Content */}
          <section className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="hidden" aria-hidden="true">
                <TabsTrigger value="new-application">New Application</TabsTrigger>
                <TabsTrigger value="add-award">Add Award</TabsTrigger>
                <TabsTrigger value="apply-call">Apply for a Call</TabsTrigger>
                <TabsTrigger value="reports">Financial Reports</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="add-milestone">Add Milestone</TabsTrigger>
              </TabsList>

              {/* New Application */}
              <TabsContent value="new-application">
                <Card>
                  <CardHeader>
                    <CardTitle>Start a New Application</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Application Title</Label>
                      <Input placeholder="e.g., AI for Sustainable Energy" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Call Reference or Name</Label>
                      <Input placeholder="e.g., NSF-2025-001 or type to search" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Abstract</Label>
                      <Textarea placeholder="Short summary of the proposed research..." />
                    </div>
                    <div className="flex gap-2">
                      <Button>Save Draft</Button>
                      <Button variant="outline">Submit</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Add Award */}
              <TabsContent value="add-award">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Award</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Award Title</Label>
                        <Input placeholder="e.g., DOE Clean Energy Award" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Sponsor / Funder</Label>
                        <Input placeholder="e.g., Department of Energy" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Amount</Label>
                        <Input placeholder="$250,000" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Award Number</Label>
                        <Input placeholder="e.g., DOE-2025-789" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Start Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">End Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Notes</Label>
                      <Textarea placeholder="Any relevant details..." />
                    </div>
                    <div className="flex gap-2">
                      <Button>Add Award</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Apply for a Call */}
              <TabsContent value="apply-call">
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for a Call</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Browse open calls and start an application.</p>
                    <div className="flex gap-2">
                      <Button onClick={() => (window.location.href = "/calls")}>View Calls</Button>
                      <Button variant="outline">Start Blank Application</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Financial Reports */}
              <TabsContent value="reports">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">$1.2M</div>
                      <p className="text-sm text-muted-foreground">Total Awarded</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">$740K</div>
                      <p className="text-sm text-muted-foreground">Spent to Date</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">$460K</div>
                      <p className="text-sm text-muted-foreground">Remaining Balance</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Downloadable Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start"><BarChart3 className="h-4 w-4 mr-2" /> Quarterly Financial Report (PDF)</Button>
                    <Button variant="outline" className="w-full justify-start"><BarChart3 className="h-4 w-4 mr-2" /> Annual Summary (CSV)</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Finance */}
              <TabsContent value="finance">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">$85K</div>
                      <p className="text-sm text-muted-foreground">Pending Reimbursements</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-sm text-muted-foreground">Open Purchase Orders</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-sm text-muted-foreground">Active Awards</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">No recent transactions to display.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Calendar */}
              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">View deadlines, milestones, and events. For a full calendar, visit the Calendar page.</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="p-3 rounded border"><Badge variant="secondary" className="mr-2">Due</Badge> Proposal Draft — Oct 15</div>
                      <div className="p-3 rounded border"><Badge variant="secondary" className="mr-2">Meeting</Badge> Team Sync — Oct 18</div>
                      <div className="p-3 rounded border"><Badge variant="secondary" className="mr-2">Deadline</Badge> Call Submission — Nov 1</div>
                      <div className="p-3 rounded border"><Badge variant="secondary" className="mr-2">Report</Badge> Q4 Report — Dec 5</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Add Milestone */}
              <TabsContent value="add-milestone">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Milestone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Milestone Title</Label>
                      <Input placeholder="e.g., IRB Approval" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Due Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Related Project / Award</Label>
                        <Input placeholder="e.g., DOE-2025-789" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Description</Label>
                      <Textarea placeholder="Details about this milestone..." />
                    </div>
                    <div className="flex gap-2">
                      <Button>Add Milestone</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </>
  );
}
