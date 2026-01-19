import { useState } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import type { ReportFilters } from '@/types';

interface ReportFilterBarProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  counsellors?: { id: string; name: string }[];
  grades?: string[];
}

export function ReportFilterBar({
  filters,
  onFiltersChange,
  counsellors = [],
  grades = [],
}: ReportFilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = [
    filters.grade,
    filters.counsellorId,
  ].filter(Boolean).length;

  const updateFilter = <K extends keyof ReportFilters>(
    key: K,
    value: ReportFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      grade: undefined,
      counsellorId: undefined,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
      {/* Date Range */}
      <div className="flex items-center gap-2">
        <Label htmlFor="date-from" className="text-sm whitespace-nowrap">
          From
        </Label>
        <Input
          id="date-from"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => updateFilter('dateFrom', e.target.value)}
          className="w-40"
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="date-to" className="text-sm whitespace-nowrap">
          To
        </Label>
        <Input
          id="date-to"
          type="date"
          value={filters.dateTo}
          onChange={(e) => updateFilter('dateTo', e.target.value)}
          className="w-40"
        />
      </div>

      {/* Advanced Filters Popover */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filter Reports</h4>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto py-1 px-2 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Grade Filter */}
            <div className="space-y-2">
              <Label htmlFor="grade-filter">Grade / Year Group</Label>
              <Select
                value={filters.grade || ''}
                onValueChange={(value) =>
                  updateFilter('grade', value || undefined)
                }
              >
                <SelectTrigger id="grade-filter">
                  <SelectValue placeholder="All grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All grades</SelectItem>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Counsellor Filter */}
            <div className="space-y-2">
              <Label htmlFor="counsellor-filter">Counsellor</Label>
              <Select
                value={filters.counsellorId || ''}
                onValueChange={(value) =>
                  updateFilter('counsellorId', value || undefined)
                }
              >
                <SelectTrigger id="counsellor-filter">
                  <SelectValue placeholder="All counsellors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All counsellors</SelectItem>
                  {counsellors.map((counsellor) => (
                    <SelectItem key={counsellor.id} value={counsellor.id}>
                      {counsellor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active filter badges */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.grade && (
            <Badge variant="secondary" className="gap-1">
              Grade: {filters.grade}
              <button
                onClick={() => updateFilter('grade', undefined)}
                className="ml-1 hover:bg-background/50 rounded-full p-0.5"
                aria-label="Remove grade filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.counsellorId && (
            <Badge variant="secondary" className="gap-1">
              Counsellor:{' '}
              {counsellors.find((c) => c.id === filters.counsellorId)?.name}
              <button
                onClick={() => updateFilter('counsellorId', undefined)}
                className="ml-1 hover:bg-background/50 rounded-full p-0.5"
                aria-label="Remove counsellor filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
