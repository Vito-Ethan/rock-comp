import * as React from 'react';
import {
  ArrowsDownUp,
  CalendarBlank,
  Check,
  MapPin,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

export type SortField = 'date' | 'distance';

export interface SortValue {
  field: SortField;
}

export const SORT_OPTIONS: {
  value: SortValue;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: { field: 'date' }, label: 'Soonest', icon: CalendarBlank },
  { value: { field: 'distance' }, label: 'Nearest', icon: MapPin },
];

interface SortByDrawerProps {
  value?: SortValue;
  onChange?: (value: SortValue) => void;
}

export function SortByDrawer({ value, onChange }: SortByDrawerProps) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(option: SortValue) {
    onChange?.(option);
    setOpen(false);
  }

  const activeOption = value
    ? SORT_OPTIONS.find((o) => o.value.field === value.field)
    : null;

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowsDownUp weight="bold" data-icon="inline-start" />
          {activeOption ? activeOption.label : 'Sort'}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="pb-2">
          <DrawerTitle>Sort by</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-1">
          {SORT_OPTIONS.map((opt) => {
            const selected = value?.field === opt.value.field;
            const Icon = opt.icon;
            return (
              <Button
                key={opt.value.field}
                variant="ghost"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'w-full justify-start rounded-xl',
                  selected && 'bg-muted font-medium',
                )}
              >
                <Icon
                  weight="bold"
                  data-icon="inline-start"
                  className="text-muted-foreground"
                />
                <span className="flex-1 text-left">{opt.label}</span>
                {selected && <Check weight="bold" data-icon="inline-end" />}
              </Button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
