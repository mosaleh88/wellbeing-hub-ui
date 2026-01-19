import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

export function useRole() {
  const { user, hasRole, canAccess } = useAuth();

  const rolePermissions = useMemo(() => {
    if (!user) {
      return {
        canViewReports: false,
        canManageUsers: false,
        canEditCases: false,
        canCreateCases: false,
        canEscalateCases: false,
        canCloseCases: false,
        canViewAllCases: false,
        canExportData: false,
      };
    }

    const role = user.role;

    return {
      // Only leadership can view reports
      canViewReports: hasRole(['leadership', 'admin']),
      
      // Only admin can manage users
      canManageUsers: hasRole('admin'),
      
      // Counsellors and above can edit cases
      canEditCases: hasRole(['counsellor', 'safeguarding_lead', 'admin']),
      
      // Counsellors and above can create cases
      canCreateCases: hasRole(['counsellor', 'safeguarding_lead', 'admin']),
      
      // Only safeguarding lead and admin can escalate
      canEscalateCases: hasRole(['safeguarding_lead', 'admin']),
      
      // Counsellors and above can close cases
      canCloseCases: hasRole(['counsellor', 'safeguarding_lead', 'admin']),
      
      // Safeguarding lead and above can view all cases
      canViewAllCases: hasRole(['safeguarding_lead', 'leadership', 'admin']),
      
      // Leadership and admin can export data
      canExportData: hasRole(['leadership', 'admin']),
    };
  }, [user, hasRole]);

  return {
    role: user?.role ?? null,
    ...rolePermissions,
    hasRole,
    canAccess,
  };
}

// Role hierarchy for display purposes
export const roleLabels: Record<UserRole, string> = {
  counsellor: 'Wellbeing Counsellor',
  safeguarding_lead: 'Safeguarding Lead',
  leadership: 'Leadership',
  admin: 'Administrator',
};

// Get role badge color
export function getRoleBadgeVariant(role: UserRole): 'default' | 'secondary' | 'outline' {
  switch (role) {
    case 'admin':
      return 'default';
    case 'leadership':
    case 'safeguarding_lead':
      return 'secondary';
    default:
      return 'outline';
  }
}
