import {
  LayoutDashboard,
  Users,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRole, roleLabels } from '@/hooks/useRole';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import type { UserRole } from '@/types';

interface NavItemConfig {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  badge?: number;
}

const navItems: NavItemConfig[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['counsellor', 'safeguarding_lead', 'leadership', 'admin'],
  },
  {
    title: 'Students',
    href: '/students',
    icon: Users,
    roles: ['counsellor', 'safeguarding_lead', 'admin'],
  },
  {
    title: 'Cases',
    href: '/cases',
    icon: FolderOpen,
    roles: ['counsellor', 'safeguarding_lead', 'leadership', 'admin'],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['leadership', 'admin'],
  },
];

const adminItems: NavItemConfig[] = [
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { canAccess } = useRole();
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const filteredNavItems = navItems.filter((item) => canAccess(item.roles));
  const filteredAdminItems = adminItems.filter((item) => canAccess(item.roles));

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <AlertTriangle className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                Wellbeing Hub
              </span>
              <span className="text-xs text-muted-foreground">
                Student Support
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.href}
                      className={cn(
                        'flex items-center gap-3',
                        location.pathname === item.href &&
                          'bg-sidebar-accent text-sidebar-accent-foreground'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <Badge
                          variant="destructive"
                          className="ml-auto h-5 min-w-5 px-1"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {filteredAdminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdminItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.href}
                      tooltip={item.title}
                    >
                      <NavLink
                        to={item.href}
                        className={cn(
                          'flex items-center gap-3',
                          location.pathname === item.href &&
                            'bg-sidebar-accent text-sidebar-accent-foreground'
                        )}
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
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {user && (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-sm font-medium text-sidebar-foreground">
                  {user.fullName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {roleLabels[user.role]}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="h-8 w-8 shrink-0"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
