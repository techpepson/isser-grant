import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  FileText,
  Trophy,
  Wallet,
  Flag,
  BarChart3,
  Shield,
  Settings as SettingsIcon,
  Calendar,
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Researchers", url: "/researchers", icon: Users },
  { title: "Calls", url: "/calls", icon: Megaphone },
  { title: "Applications", url: "/applications", icon: FileText },
  { title: "Awards", url: "/awards", icon: Trophy },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Finance", url: "/finance", icon: Wallet },
  { title: "Milestones", url: "/milestones", icon: Flag },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Admin", url: "/admin", icon: Shield },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="none" className="w-64 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-active={isActive(item.url)}>
                    <NavLink 
                      to={item.url} 
                      end 
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
