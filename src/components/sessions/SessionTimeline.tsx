import { SessionCard } from './SessionCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import { FileText } from 'lucide-react';
import type { Session } from '@/types';

interface SessionTimelineProps {
  sessions: Session[];
  canAddSession?: boolean;
  onAddSession?: () => void;
  className?: string;
}

export function SessionTimeline({
  sessions,
  canAddSession = false,
  onAddSession,
  className,
}: SessionTimelineProps) {
  if (sessions.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No sessions recorded"
        description="This case doesn't have any sessions yet. Add the first session to start documenting support."
        action={
          canAddSession && onAddSession
            ? { label: 'Add First Session', onClick: onAddSession }
            : undefined
        }
        className={className}
      />
    );
  }

  // Sort sessions by session number in ascending order
  const sortedSessions = [...sessions].sort((a, b) => a.sessionNumber - b.sessionNumber);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Sessions ({sessions.length})
        </h3>
        {canAddSession && onAddSession && (
          <Button onClick={onAddSession} size="sm">
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Session
          </Button>
        )}
      </div>

      <div className="relative space-y-4">
        {/* Timeline line */}
        <div
          className="absolute left-5 top-6 bottom-6 w-px bg-border"
          aria-hidden="true"
        />

        {sortedSessions.map((session) => (
          <div key={session.id} className="relative pl-12">
            {/* Timeline dot */}
            <div
              className="absolute left-3.5 top-5 h-3 w-3 rounded-full bg-primary border-2 border-background"
              aria-hidden="true"
            />
            <SessionCard session={session} />
          </div>
        ))}
      </div>
    </div>
  );
}
