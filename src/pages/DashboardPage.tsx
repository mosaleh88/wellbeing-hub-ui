import { useNavigate } from 'react-router-dom';
import { FolderOpen, Users, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CaseCard } from '@/components/cases/CaseCard';
import { AlertBanner } from '@/components/shared/AlertBanner';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Case, Student, DashboardStats } from '@/types';

// Mock data
const mockStats: DashboardStats = {
  openCases: 12,
  monitoringCases: 5,
  closedCases: 28,
  sessionsThisWeek: 8,
  escalatedCases: 2,
};

const mockStudent: Student = {
  id: '1',
  firstName: 'Emily',
  lastName: 'Thompson',
  esisNumber: 'ES12345',
  grade: 'Year 9',
  formGroup: '9B',
  dateOfBirth: '2010-03-15',
  formTutor: 'Mr. Harris',
};

const mockCases: Case[] = [
  {
    id: '1',
    studentId: '1',
    student: mockStudent,
    counsellorId: '1',
    status: 'open',
    isEscalated: true,
    isLocked: false,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    referralReason: 'Anxiety related to upcoming exams and social difficulties with peers.',
  },
  {
    id: '2',
    studentId: '2',
    student: { ...mockStudent, id: '2', firstName: 'James', lastName: 'Wilson' },
    counsellorId: '1',
    status: 'monitoring',
    isEscalated: false,
    isLocked: false,
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-14T11:00:00Z',
    referralReason: 'Following up on previous intervention for low mood.',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { canViewReports } = useRole();
  const navigate = useNavigate();

  const handleAddSession = (caseId: string) => {
    navigate(`/cases/${caseId}/session/new`);
  };

  const escalatedCases = mockCases.filter((c) => c.isEscalated);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.fullName.split(' ')[0]}</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Escalated Cases Alert */}
        {escalatedCases.length > 0 && (
          <AlertBanner
            variant="warning"
            title={`${escalatedCases.length} escalated ${escalatedCases.length === 1 ? 'case requires' : 'cases require'} attention`}
            description="Review escalated cases as a priority."
            action={{ label: 'View Cases', onClick: () => navigate('/cases?filter=escalated') }}
          />
        )}

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Open Cases" value={mockStats.openCases} icon={FolderOpen} variant="success" />
          <StatCard title="Monitoring" value={mockStats.monitoringCases} icon={AlertTriangle} variant="warning" />
          <StatCard title="Sessions This Week" value={mockStats.sessionsThisWeek} icon={Calendar} />
          <StatCard title="Total Students" value={mockStats.openCases + mockStats.monitoringCases} icon={Users} />
        </div>

        {/* Recent Cases */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Your Recent Cases</h2>
          {mockCases.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockCases.map((caseData) => (
                <CaseCard key={caseData.id} caseData={caseData} onAddSession={handleAddSession} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FolderOpen}
              title="No cases assigned"
              description="You don't have any cases assigned yet."
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
