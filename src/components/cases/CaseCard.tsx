import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Case } from '@/types';

interface CaseCardProps {
  caseData: Case;
  showStudent?: boolean;
  showCounsellor?: boolean;
  onAddSession?: (caseId: string) => void;
  className?: string;
}

export function CaseCard({
  caseData,
  showStudent = true,
  showCounsellor = false,
  onAddSession,
  className,
}: CaseCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card
      className={cn(
        'transition-shadow hover:shadow-md',
        caseData.isEscalated && 'border-warning/50 bg-warning/5',
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          {showStudent && caseData.student && (
            <Link
              to={`/students/${caseData.studentId}`}
              className="font-semibold hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              {caseData.student.firstName} {caseData.student.lastName}
            </Link>
          )}
          <div className="flex items-center gap-2">
            <StatusBadge status={caseData.status} />
            {caseData.isEscalated && (
              <Badge variant="destructive" className="text-xs">
                Escalated
              </Badge>
            )}
            {caseData.isLocked && (
              <Badge variant="secondary" className="text-xs">
                Locked
              </Badge>
            )}
          </div>
        </div>
        <Link to={`/cases/${caseData.id}`}>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {caseData.referralReason}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {showCounsellor && caseData.counsellor && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" aria-hidden="true" />
              <span>{caseData.counsellor.fullName}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            <span>Opened {formatDate(caseData.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>Updated {formatDate(caseData.updatedAt)}</span>
          </div>
        </div>

        {onAddSession && !caseData.isLocked && caseData.status !== 'closed' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddSession(caseData.id)}
            className="w-full mt-2"
          >
            Add Session
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
