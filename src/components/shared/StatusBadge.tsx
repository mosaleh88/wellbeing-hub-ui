import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { CaseStatus } from '@/types';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      status: {
        open: 'status-open',
        monitoring: 'status-monitoring',
        closed: 'status-closed',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      status: 'open',
      size: 'default',
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  status: CaseStatus;
  className?: string;
  showIcon?: boolean;
}

const statusLabels: Record<CaseStatus, string> = {
  open: 'Open',
  monitoring: 'Monitoring',
  closed: 'Closed',
};

const statusIcons: Record<CaseStatus, string> = {
  open: '●',
  monitoring: '◐',
  closed: '○',
};

export function StatusBadge({
  status,
  size,
  className,
  showIcon = true,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(statusBadgeVariants({ status, size }), className)}
      role="status"
      aria-label={`Case status: ${statusLabels[status]}`}
    >
      {showIcon && (
        <span className="mr-1" aria-hidden="true">
          {statusIcons[status]}
        </span>
      )}
      {statusLabels[status]}
    </span>
  );
}
