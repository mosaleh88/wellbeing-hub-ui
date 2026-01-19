import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Session, SessionType } from '@/types';

interface SessionCardProps {
  session: Session;
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

const sessionTypeLabels: Record<SessionType, string> = {
  initial: 'Initial',
  follow_up: 'Follow-up',
  crisis: 'Crisis',
  group: 'Group',
};

const sessionTypeVariants: Record<SessionType, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  initial: 'default',
  follow_up: 'secondary',
  crisis: 'destructive',
  group: 'outline',
};

export function SessionCard({
  session,
  isExpanded: controlledExpanded,
  onToggle,
  className,
}: SessionCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded ?? internalExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <Card className={cn('transition-shadow', isExpanded && 'shadow-md', className)}>
      <button
        onClick={handleToggle}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-t-lg"
        aria-expanded={isExpanded}
        aria-controls={`session-content-${session.id}`}
      >
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {session.sessionNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Session {session.sessionNumber}</span>
                <Badge variant={sessionTypeVariants[session.type]}>
                  {sessionTypeLabels[session.type]}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {formatDate(session.sessionDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {formatDuration(session.duration)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            )}
          </div>
        </CardContent>
      </button>

      {isExpanded && (
        <div
          id={`session-content-${session.id}`}
          className="border-t px-6 py-4 space-y-4 animate-fade-in"
        >
          {/* Interventions */}
          {session.interventions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Interventions</h4>
              <div className="flex flex-wrap gap-2">
                {session.interventions.map((intervention, index) => (
                  <Badge key={index} variant="outline">
                    {intervention}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Summary
            </h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {session.summary}
            </p>
          </div>

          {/* Next Steps */}
          {session.nextSteps && (
            <div>
              <h4 className="text-sm font-medium mb-2">Next Steps</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {session.nextSteps}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-2 border-t text-xs text-muted-foreground">
            <span>
              Last updated: {formatDate(session.updatedAt)}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
