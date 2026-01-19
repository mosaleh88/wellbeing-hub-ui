import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Check, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import type { SessionType } from '@/types';

const sessionFormSchema = z.object({
  sessionDate: z.string().min(1, 'Session date is required'),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  type: z.enum(['initial', 'follow_up', 'crisis', 'group'] as const),
  interventions: z.array(z.string()),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  nextSteps: z.string().optional(),
});

type SessionFormData = z.infer<typeof sessionFormSchema>;

interface SessionFormProps {
  initialData?: Partial<SessionFormData>;
  onSubmit: (data: SessionFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const durationOptions = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
];

const typeOptions: { value: SessionType; label: string }[] = [
  { value: 'initial', label: 'Initial Assessment' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'crisis', label: 'Crisis Intervention' },
  { value: 'group', label: 'Group Session' },
];

const interventionOptions = [
  'Active Listening',
  'CBT Techniques',
  'Mindfulness',
  'Relaxation Exercises',
  'Goal Setting',
  'Problem Solving',
  'Psychoeducation',
  'Coping Strategies',
  'Family Consultation',
  'Safeguarding Referral',
];

export function SessionForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: SessionFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      sessionDate: initialData?.sessionDate || new Date().toISOString().split('T')[0],
      duration: initialData?.duration || 30,
      type: initialData?.type || 'follow_up',
      interventions: initialData?.interventions || [],
      summary: initialData?.summary || '',
      nextSteps: initialData?.nextSteps || '',
    },
  });

  const isDirty = form.formState.isDirty;

  // Autosave functionality
  const autoSave = useCallback(async () => {
    if (!isDirty) return;
    setIsSaving(true);
    // Simulate autosave - in production this would save a draft
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLastSaved(new Date());
    setIsSaving(false);
  }, [isDirty]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDirty) {
        autoSave();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [form.watch(), isDirty, autoSave]);

  const handleSubmit = async (data: SessionFormData) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      onCancel();
    }
  };

  const toggleIntervention = (intervention: string) => {
    const current = form.getValues('interventions');
    if (current.includes(intervention)) {
      form.setValue(
        'interventions',
        current.filter((i) => i !== intervention),
        { shouldDirty: true }
      );
    } else {
      form.setValue('interventions', [...current, intervention], { shouldDirty: true });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Autosave indicator */}
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <Check className="h-4 w-4 text-success" aria-hidden="true" />
                <span>Saved at {lastSaved.toLocaleTimeString()}</span>
              </>
            ) : null}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Session Date */}
            <FormField
              control={form.control}
              name="sessionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Interventions */}
          <FormField
            control={form.control}
            name="interventions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interventions Used</FormLabel>
                <FormDescription>
                  Select all interventions used during this session
                </FormDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  {interventionOptions.map((intervention) => (
                    <Badge
                      key={intervention}
                      variant={field.value.includes(intervention) ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer transition-colors',
                        field.value.includes(intervention) && 'bg-primary'
                      )}
                      onClick={() => toggleIntervention(intervention)}
                      role="checkbox"
                      aria-checked={field.value.includes(intervention)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleIntervention(intervention);
                        }
                      }}
                    >
                      {intervention}
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Summary */}
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Summary</FormLabel>
                <FormDescription>
                  Provide a detailed summary of the session content and observations
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    placeholder="Describe what was discussed, student's presentation, key themes, and any concerns..."
                    className="resize-y min-h-32"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <FormMessage />
                  <span>{field.value.length} characters</span>
                </div>
              </FormItem>
            )}
          />

          {/* Next Steps */}
          <FormField
            control={form.control}
            name="nextSteps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Steps</FormLabel>
                <FormDescription>
                  Outline planned actions, follow-up dates, or referrals
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Next session planned for..., Will follow up with..., Refer to..."
                    className="resize-y min-h-24"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" aria-hidden="true" />
                  {isEditing ? 'Update Session' : 'Save Session'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Cancel confirmation dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Editing</AlertDialogCancel>
            <AlertDialogAction onClick={onCancel}>Discard Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
