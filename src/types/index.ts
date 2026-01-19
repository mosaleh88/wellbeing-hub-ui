// User Roles
export type UserRole = 'counsellor' | 'safeguarding_lead' | 'leadership' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
}

// Case Status
export type CaseStatus = 'open' | 'monitoring' | 'closed';

// Session Types
export type SessionType = 'initial' | 'follow_up' | 'crisis' | 'group';

// Student
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  esisNumber: string;
  grade: string;
  formGroup: string;
  dateOfBirth: string;
  formTutor: string;
}

// Case
export interface Case {
  id: string;
  studentId: string;
  student?: Student;
  counsellorId: string;
  counsellor?: User;
  status: CaseStatus;
  isEscalated: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  referralReason: string;
  notes?: string;
}

// Session
export interface Session {
  id: string;
  caseId: string;
  sessionNumber: number;
  sessionDate: string;
  duration: number; // in minutes
  type: SessionType;
  interventions: string[];
  summary: string;
  nextSteps: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Dashboard Stats
export interface DashboardStats {
  openCases: number;
  monitoringCases: number;
  closedCases: number;
  sessionsThisWeek: number;
  escalatedCases: number;
}

// Report Filters
export interface ReportFilters {
  dateFrom: string;
  dateTo: string;
  grade?: string;
  counsellorId?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Form States
export interface FormState {
  isSubmitting: boolean;
  isSaving: boolean;
  lastSaved?: Date;
  errors: Record<string, string>;
}

// Navigation Item
export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  badge?: number;
}
