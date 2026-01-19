import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
  variant?: 'card' | 'table' | 'form' | 'page';
}

export function LoadingState({ className, variant = 'card' }: LoadingStateProps) {
  if (variant === 'table') {
    return (
      <div className={cn('space-y-3', className)} role="status" aria-label="Loading">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="rounded-lg border">
          <div className="border-b p-4">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b p-4 last:border-b-0">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>
        <span className="sr-only">Loading table data</span>
      </div>
    );
  }

  if (variant === 'form') {
    return (
      <div className={cn('space-y-6', className)} role="status" aria-label="Loading">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
        <span className="sr-only">Loading form</span>
      </div>
    );
  }

  if (variant === 'page') {
    return (
      <div className={cn('space-y-6', className)} role="status" aria-label="Loading">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-lg" />
        <span className="sr-only">Loading page content</span>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={cn('space-y-4', className)} role="status" aria-label="Loading">
      <div className="rounded-lg border p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <span className="sr-only">Loading content</span>
    </div>
  );
}

// Inline loading spinner
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent',
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
