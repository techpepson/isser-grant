import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { AddEventDialog } from "./AddEventDialog";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: "deadline" | "meeting" | "review" | "presentation";
  location?: string;
  attendees?: number;
}

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "NSF Research Grant Application",
    description: "Final submission deadline for NSF research grant applications",
    date: new Date(2024, 1, 15), // February 15, 2024
    type: "deadline"
  },
  {
    id: "2",
    title: "Budget Review Meeting",
    description: "Quarterly budget review and allocation meeting",
    date: new Date(2024, 1, 25), // February 25, 2024
    type: "meeting",
    location: "Conference Room A",
    attendees: 12
  },
  {
    id: "3",
    title: "Research Proposal Presentation",
    description: "Dr. Sarah Johnson's climate research proposal presentation",
    date: new Date(2024, 1, 28), // February 28, 2024
    type: "presentation",
    location: "Auditorium B",
    attendees: 45
  },
  {
    id: "4",
    title: "Award Review Committee",
    description: "Monthly award review committee meeting",
    date: new Date(2024, 2, 5), // March 5, 2024
    type: "review",
    location: "Conference Room C",
    attendees: 8
  },
  {
    id: "5",
    title: "Quarterly Progress Report",
    description: "Submission deadline for quarterly progress reports",
    date: new Date(2024, 2, 20), // March 20, 2024
    type: "deadline"
  }
];

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  
  const addEvent = (newEventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...newEventData,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, newEvent]);
  };
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "deadline":
        return "destructive";
      case "meeting":
        return "default";
      case "review":
        return "secondary";
      case "presentation":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getEventTypeIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "deadline":
        return Clock;
      case "meeting":
        return Users;
      case "review":
        return CalendarIcon;
      case "presentation":
        return MapPin;
      default:
        return CalendarIcon;
    }
  };

  // Function to determine if a date has events
  const hasEvents = (date: Date) => {
    return events.some(event => isSameDay(event.date, date));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Calendar
          </CardTitle>
          <CardDescription>
            View upcoming deadlines, meetings, and events
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("p-3 pointer-events-auto")}
            modifiers={{
              hasEvents: (date) => hasEvents(date)
            }}
            modifiersStyles={{
              hasEvents: {
                backgroundColor: "hsl(var(--accent))",
                color: "hsl(var(--accent-foreground))",
                fontWeight: "bold"
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "Select a date"}
          </CardTitle>
          <CardDescription>
            {selectedEvents.length > 0 
              ? `${selectedEvents.length} event${selectedEvents.length > 1 ? 's' : ''} scheduled`
              : "No events scheduled"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedEvents.map((event) => {
                const IconComponent = getEventTypeIcon(event.type);
                return (
                  <div key={event.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="mt-1">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={getEventTypeColor(event.type)} className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      {(event.location || event.attendees) && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          )}
                          {event.attendees && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.attendees} attendees
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No events scheduled for this date</p>
              <div className="mt-4">
                <AddEventDialog selectedDate={selectedDate} onEventAdd={addEvent} />
              </div>
            </div>
          )}
          {selectedEvents.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <AddEventDialog selectedDate={selectedDate} onEventAdd={addEvent} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}