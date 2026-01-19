import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation, Link } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Map routes to breadcrumb labels
const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  students: 'Students',
  cases: 'Cases',
  reports: 'Reports',
  settings: 'Settings',
  session: 'Session',
  new: 'New',
};

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    const label = routeLabels[segment] || segment;

    return {
      path,
      label,
      isLast,
    };
  });

  return (
    <SidebarProvider>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AppSidebar />

      <SidebarInset className="flex flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.path}>
                  <BreadcrumbSeparator />
                  {crumb.isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.path}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main content */}
        <main
          id="main-content"
          className="flex-1 overflow-auto p-6"
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
