import { AlertTriangle, X, Info, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type AlertVariant = 'warning' | 'error' | 'info' | 'success';

interface AlertBannerProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  warning: 'bg-warning/10 border-warning/30 text-warning-foreground',
  error: 'bg-destructive/10 border-destructive/30 text-destructive',
  info: 'bg-primary/10 border-primary/30 text-primary',
  success: 'bg-success/10 border-success/30 text-success',
};

const variantIcons: Record<AlertVariant, React.ComponentType<{ className?: string }>> = {
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

export function AlertBanner({
  variant = 'warning',
  title,
  description,
  dismissible = false,
  onDismiss,
  action,
  className,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const Icon = variantIcons[variant];

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 rounded-lg border p-4',
        variantStyles[variant],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="font-medium">{title}</p>
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
        {action && (
          <Button
            variant="link"
            size="sm"
            onClick={action.onClick}
            className="mt-2 h-auto p-0 font-medium"
          >
            {action.label}
          </Button>
        )}
      </div>
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="h-6 w-6 shrink-0 opacity-70 hover:opacity-100"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
