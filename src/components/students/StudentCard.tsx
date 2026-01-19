import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, User, Hash, Calendar } from 'lucide-react';
import type { Student } from '@/types';

interface StudentCardProps {
  student: Student;
  casesCount?: number;
  onOpenCase?: (studentId: string) => void;
  canOpenCase?: boolean;
  className?: string;
}

export function StudentCard({
  student,
  casesCount = 0,
  onOpenCase,
  canOpenCase = false,
  className,
}: StudentCardProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary text-lg">
            {getInitials(student.firstName, student.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <Link
            to={`/students/${student.id}`}
            className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
          >
            <CardTitle className="text-lg truncate">
              {student.firstName} {student.lastName}
            </CardTitle>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Hash className="h-3 w-3" aria-hidden="true" />
              {student.esisNumber}
            </span>
          </div>
        </div>
        {casesCount > 0 && (
          <Badge variant="secondary">
            {casesCount} {casesCount === 1 ? 'case' : 'cases'}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            <span>
              {student.grade} • {student.formGroup}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">{student.formTutor}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>DOB: {formatDate(student.dateOfBirth)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Link to={`/students/${student.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </Link>
          {canOpenCase && onOpenCase && (
            <Button
              variant="default"
              onClick={() => onOpenCase(student.id)}
            >
              Open Case
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
