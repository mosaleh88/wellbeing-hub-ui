import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { CaseCard } from '@/components/cases/CaseCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, Plus } from 'lucide-react';
import type { Case, Student, CaseStatus } from '@/types';

const mockStudent: Student = { id: '1', firstName: 'Emily', lastName: 'Thompson', esisNumber: 'ES12345', grade: 'Year 9', formGroup: '9B', dateOfBirth: '2010-03-15', formTutor: 'Mr. Harris' };

const mockCases: Case[] = [
  { id: '1', studentId: '1', student: mockStudent, counsellorId: '1', status: 'open', isEscalated: true, isLocked: false, createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-15T14:30:00Z', referralReason: 'Anxiety related to upcoming exams.' },
  { id: '2', studentId: '2', student: { ...mockStudent, id: '2', firstName: 'James', lastName: 'Wilson' }, counsellorId: '1', status: 'monitoring', isEscalated: false, isLocked: false, createdAt: '2024-01-05T09:00:00Z', updatedAt: '2024-01-14T11:00:00Z', referralReason: 'Low mood follow-up.' },
  { id: '3', studentId: '3', student: { ...mockStudent, id: '3', firstName: 'Sophie', lastName: 'Brown' }, counsellorId: '1', status: 'closed', isEscalated: false, isLocked: true, createdAt: '2023-11-01T09:00:00Z', updatedAt: '2023-12-20T16:00:00Z', referralReason: 'Completed support plan.' },
];

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState<CaseStatus | 'all'>('all');
  const navigate = useNavigate();

  const filteredCases = activeTab === 'all' ? mockCases : mockCases.filter((c) => c.status === activeTab);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cases</h1>
            <p className="text-muted-foreground">Manage student support cases</p>
          </div>
          <Button onClick={() => navigate('/students')}>
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CaseStatus | 'all')}>
          <TabsList>
            <TabsTrigger value="all">All ({mockCases.length})</TabsTrigger>
            <TabsTrigger value="open">Open ({mockCases.filter((c) => c.status === 'open').length})</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring ({mockCases.filter((c) => c.status === 'monitoring').length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({mockCases.filter((c) => c.status === 'closed').length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filteredCases.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredCases.map((caseData) => (
                  <CaseCard key={caseData.id} caseData={caseData} onAddSession={(id) => navigate(`/cases/${id}/session/new`)} />
                ))}
              </div>
            ) : (
              <EmptyState icon={FolderOpen} title="No cases found" description="No cases match the current filter." />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
