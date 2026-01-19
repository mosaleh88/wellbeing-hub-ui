import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StudentSearch } from '@/components/students/StudentSearch';
import { StudentCard } from '@/components/students/StudentCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingState } from '@/components/shared/LoadingState';
import { useRole } from '@/hooks/useRole';
import { Users } from 'lucide-react';
import type { Student } from '@/types';

const mockStudents: Student[] = [
  { id: '1', firstName: 'Emily', lastName: 'Thompson', esisNumber: 'ES12345', grade: 'Year 9', formGroup: '9B', dateOfBirth: '2010-03-15', formTutor: 'Mr. Harris' },
  { id: '2', firstName: 'James', lastName: 'Wilson', esisNumber: 'ES12346', grade: 'Year 10', formGroup: '10A', dateOfBirth: '2009-07-22', formTutor: 'Ms. Clarke' },
  { id: '3', firstName: 'Sophie', lastName: 'Brown', esisNumber: 'ES12347', grade: 'Year 8', formGroup: '8C', dateOfBirth: '2011-11-08', formTutor: 'Mr. Adams' },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { canCreateCases } = useRole();

  const filteredStudents = mockStudents.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.esisNumber}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">Search and view student profiles</p>
        </div>

        <StudentSearch onSearch={handleSearch} />

        {isLoading ? (
          <LoadingState variant="card" />
        ) : filteredStudents.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                casesCount={Math.floor(Math.random() * 3)}
                canOpenCase={canCreateCases}
                onOpenCase={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon={Users} title="No students found" description="Try adjusting your search terms." />
        )}
      </div>
    </AppLayout>
  );
}
