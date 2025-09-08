import { Helmet } from "react-helmet-async";
import { CalendarView } from "@/components/calendar/CalendarView";

export default function Calendar() {
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Research Calendar - ISSER Portal</title>
        <meta name="description" content="View and manage research events, deadlines, and milestones in the calendar interface." />
      </Helmet>
      
      <div>
        <h1 className="text-3xl font-bold text-foreground">Research Calendar</h1>
        <p className="text-muted-foreground mt-2">
          View and manage research events, deadlines, and milestones
        </p>
      </div>

      <CalendarView />
    </div>
  );
}