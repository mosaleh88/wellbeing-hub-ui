import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRoles = [],
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, canAccess } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role access
  if (requiredRoles.length > 0 && !canAccess(requiredRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Component for hiding elements based on role
interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export function RoleGate({ children, allowedRoles, fallback = null }: RoleGateProps) {
  const { canAccess } = useAuth();

  if (!canAccess(allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
