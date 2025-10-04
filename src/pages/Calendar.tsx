import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { CalendarView } from "@/components/calendar/CalendarView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar as CalendarIcon,
  Clock,
  Flag,
  FileText,
  Users,
  AlertCircle,
  Plus,
  Filter,
  Search,
} from "lucide-react";

export default function Calendar() {
  const canonical = typeof window !== "undefined" ? window.location.href : "";
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Sample events data (similar to ResearcherPortal)
  const events = useMemo(
    () => [
      {
        id: "E-001",
        type: "Deadline",
        label: "NSF Research Grant Program due",
        date: "2025-11-15",
        category: "Funding",
        priority: "high",
        description: "Submission deadline for NSF research grant application",
      },
      {
        id: "E-002",
        type: "Deadline",
        label: "Biomedical Research Excellence due",
        date: "2025-10-20",
        category: "Funding",
        priority: "high",
        description: "NIH biomedical research grant deadline",
      },
      {
        id: "E-003",
        type: "Deadline",
        label: "Clean Energy Innovation due",
        date: "2025-12-10",
        category: "Funding",
        priority: "medium",
        description: "DOE clean energy research proposal deadline",
      },
      {
        id: "E-004",
        type: "Milestone",
        label: "IRB Submission",
        date: "2025-10-25",
        category: "Research",
        priority: "high",
        description: "Institutional Review Board submission deadline",
      },
      {
        id: "E-005",
        type: "Milestone",
        label: "Budget Draft",
        date: "2025-11-03",
        category: "Research",
        priority: "medium",
        description: "Complete budget draft for NSF proposal",
      },
      {
        id: "E-006",
        type: "Meeting",
        label: "Team Sync Meeting",
        date: "2025-10-18",
        category: "Meeting",
        priority: "low",
        description: "Weekly team synchronization meeting",
      },
      {
        id: "E-007",
        type: "Report",
        label: "Q4 Progress Report",
        date: "2025-12-05",
        category: "Reporting",
        priority: "medium",
        description: "Quarterly progress report submission",
      },
      {
        id: "E-008",
        type: "Conference",
        label: "AI Research Conference",
        date: "2025-11-22",
        category: "Conference",
        priority: "low",
        description: "Annual AI research conference attendance",
      },
    ],
    []
  );

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((event) => event.category === filterCategory);
    }

    return filtered.sort((a, b) => a.date.localeCompare(b.date));
  }, [events, searchTerm, filterCategory]);

  // Calculate metrics
  const upcomingDeadlines = events.filter(
    (e) => e.type === "Deadline" && new Date(e.date) >= new Date()
  ).length;
  const upcomingMilestones = events.filter(
    (e) => e.type === "Milestone" && new Date(e.date) >= new Date()
  ).length;
  const highPriorityEvents = events.filter(
    (e) => e.priority === "high" && new Date(e.date) >= new Date()
  ).length;
  const thisWeekEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= today && eventDate <= weekFromNow;
  }).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Funding":
        return <FileText className="h-4 w-4" />;
      case "Research":
        return <Flag className="h-4 w-4" />;
      case "Meeting":
        return <Users className="h-4 w-4" />;
      case "Reporting":
        return <FileText className="h-4 w-4" />;
      case "Conference":
        return <Users className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Research Calendar - ISSER Portal</title>
        <meta
          name="description"
          content="View and manage research events, deadlines, and milestones in the calendar interface."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Research Calendar
        </h1>
        <p className="text-muted-foreground">
          View and manage research events, deadlines, and milestones
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {upcomingDeadlines}
            </div>
            <p className="text-sm text-muted-foreground">Upcoming Deadlines</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">
              {upcomingMilestones}
            </div>
            <p className="text-sm text-muted-foreground">Active Milestones</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {highPriorityEvents}
            </div>
            <p className="text-sm text-muted-foreground">
              High Priority Events
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {thisWeekEvents}
            </div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search & Filter Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Search Events
                  </Label>
                  <Input
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Filter by Category
                  </Label>
                  <select
                    className="w-full h-10 rounded border px-3 text-sm bg-background"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Funding">Funding</option>
                    <option value="Research">Research</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Reporting">Reporting</option>
                    <option value="Conference">Conference</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No events found matching your criteria.
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(event.category)}
                            <div className="font-medium">{event.label}</div>
                            <Badge
                              variant={
                                event.priority === "high"
                                  ? "destructive"
                                  : event.priority === "medium"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {event.priority}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {event.date} • {event.category}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {event.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-medium ${getPriorityColor(
                              event.priority
                            )}`}
                          >
                            {event.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Calendar View and Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Add New Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Flag className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Export Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          {/* High Priority Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events
                  .filter(
                    (e) =>
                      e.priority === "high" && new Date(e.date) >= new Date()
                  )
                  .slice(0, 3)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-red-500 pl-3"
                    >
                      <div className="font-medium text-sm">{event.label}</div>
                      <div className="text-xs text-muted-foreground">
                        Due: {event.date}
                      </div>
                    </div>
                  ))}
                {events.filter(
                  (e) => e.priority === "high" && new Date(e.date) >= new Date()
                ).length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No high priority events at the moment.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar View */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarView />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
