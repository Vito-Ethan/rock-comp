import * as React from 'react';
import { type DateRange } from 'react-day-picker';
import { CalendarBlank, Funnel, X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

const CLIMBING_STYLES = ['Boulder', 'Lead', 'Speed', 'Combined'] as const;

export interface EventFiltersValue {
  styles: string[];
  zipCode: string;
  radiusMiles: number;
  dateRange: DateRange | undefined;
}

const DEFAULT_FILTERS: EventFiltersValue = {
  styles: [],
  zipCode: '',
  radiusMiles: 50,
  dateRange: undefined,
};

function formatDateRange(range: DateRange | undefined): string {
  if (!range?.from) return 'Select dates';
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  if (!range.to) return fmt(range.from);
  return `${fmt(range.from)} – ${fmt(range.to)}`;
}

function countActiveFilters(filters: EventFiltersValue): number {
  let count = 0;
  if (filters.styles.length > 0) count++;
  if (filters.zipCode) count++;
  if (filters.dateRange?.from) count++;
  return count;
}

interface EventFiltersProps {
  value?: EventFiltersValue;
  onChange?: (value: EventFiltersValue) => void;
}

export function EventFilters({ value, onChange }: EventFiltersProps) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<EventFiltersValue>(
    value ?? DEFAULT_FILTERS,
  );

  React.useEffect(() => {
    if (open) setDraft(value ?? DEFAULT_FILTERS);
  }, [open, value]);

  function update<T extends keyof EventFiltersValue>(
    key: T,
    val: EventFiltersValue[T],
  ) {
    setDraft((prev) => ({ ...prev, [key]: val }));
  }

  function handleApply() {
    onChange?.(draft);
    setOpen(false);
  }

  function handleReset() {
    setDraft(DEFAULT_FILTERS);
  }

  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const activeCount = countActiveFilters(value ?? DEFAULT_FILTERS);
  const hasDateRange = !!draft.dateRange?.from;

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Funnel weight="bold" data-icon="inline-start" />
          Filters
          {activeCount > 0 && (
            <Badge className="ml-0.5 h-5 min-w-5 px-1.5 text-xs">
              {activeCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex-row items-center justify-between pb-0">
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon-sm">
              <X weight="bold" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Climbing Style */}
          <section className="space-y-3">
            <Label className="text-sm font-semibold">Climbing Style</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              size="sm"
              spacing={0}
              value={draft.styles}
              onValueChange={(val) => update('styles', val)}
            >
              {CLIMBING_STYLES.map((style) => (
                <ToggleGroupItem
                  key={style}
                  value={style}
                  className="text-xs px-2"
                >
                  {style}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </section>

          <Separator />

          {/* Location */}
          <section className="space-y-4">
            <Label className="text-sm font-semibold">Location</Label>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Zip Code</Label>
              <Input
                placeholder="e.g. 10001"
                maxLength={5}
                value={draft.zipCode}
                onChange={(e) =>
                  update('zipCode', e.target.value.replace(/\D/g, ''))
                }
                className="h-8 text-xs max-w-40"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Radius</Label>
                <span className="text-sm font-medium tabular-nums">
                  {draft.radiusMiles} mi
                </span>
              </div>
              <Slider
                min={5}
                max={500}
                step={5}
                value={[draft.radiusMiles]}
                onValueChange={([val]) => update('radiusMiles', val)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 mi</span>
                <span>500 mi</span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Date Range */}
          <section className="space-y-3">
            <Label className="text-sm font-semibold">Date Range</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'w-full justify-start text-xs font-normal',
                    !hasDateRange && 'text-muted-foreground',
                  )}
                >
                  <CalendarBlank
                    data-icon="inline-start"
                    className="size-3.5 shrink-0"
                  />
                  {formatDateRange(draft.dateRange)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={draft.dateRange}
                  onSelect={(range) => {
                    update('dateRange', range);
                    if (range?.from && range?.to) setCalendarOpen(false);
                  }}
                  numberOfMonths={1}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
            {hasDateRange && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => update('dateRange', undefined)}
              >
                Clear dates
              </Button>
            )}
          </section>
        </div>

        <DrawerFooter className="flex-row gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            Reset
          </Button>
          <Button className="flex-1" onClick={handleApply}>
            Apply Filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
