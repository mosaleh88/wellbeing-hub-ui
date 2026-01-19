import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  canAccess: (requiredRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development - in production this comes from Supabase
const mockUsers: Record<string, User> = {
  'counsellor@school.edu': {
    id: '1',
    email: 'counsellor@school.edu',
    fullName: 'Sarah Johnson',
    role: 'counsellor',
  },
  'lead@school.edu': {
    id: '2',
    email: 'lead@school.edu',
    fullName: 'Michael Chen',
    role: 'safeguarding_lead',
  },
  'leadership@school.edu': {
    id: '3',
    email: 'leadership@school.edu',
    fullName: 'Emma Williams',
    role: 'leadership',
  },
  'admin@school.edu': {
    id: '4',
    email: 'admin@school.edu',
    fullName: 'James Brown',
    role: 'admin',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - in production, this uses Supabase auth
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser = mockUsers[email.toLowerCase()];
      if (mockUser) {
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]) => {
      if (!user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(user.role);
    },
    [user]
  );

  const canAccess = useCallback(
    (requiredRoles: UserRole[]) => {
      if (!user) return false;
      if (requiredRoles.length === 0) return true;
      return requiredRoles.includes(user.role);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasRole,
      canAccess,
    }),
    [user, isLoading, login, logout, hasRole, canAccess]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
