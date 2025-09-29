import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Researchers from "./pages/Researchers";
import Calls from "./pages/Calls";
import Applications from "./pages/Applications";
import Awards from "./pages/Awards";
import Calendar from "./pages/Calendar";
import Finance from "./pages/Finance";
import Milestones from "./pages/Milestones";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import ResearcherPortal from "./pages/ResearcherPortal";
import AssistantPortal from "./pages/AssistantPortal";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/researchers" element={<Researchers />} />
              <Route path="/researcher" element={<ResearcherPortal />} />
              <Route path="/assistant" element={<AssistantPortal />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/milestones" element={<Milestones />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
