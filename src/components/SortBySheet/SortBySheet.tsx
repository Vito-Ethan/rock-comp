import { useState } from 'react';
import { ArrowsDownUp, Check } from '@phosphor-icons/react';
import type { SortValue } from '@/components/SortByDrawer/SortByDrawer';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SORT_OPTIONS } from '@/components/SortByDrawer/SortByDrawer';

interface SortBySheetProps {
  value?: SortValue;
  onChange?: (value: SortValue) => void;
}

export default function SortBySheet({ value, onChange }: SortBySheetProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(option: SortValue) {
    onChange?.(option);
    setOpen(false);
  }

  const activeOption = value
    ? SORT_OPTIONS.find((o) => o.value.field === value.field)
    : null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowsDownUp weight="bold" data-icon="inline-start" />
          {activeOption ? activeOption.label : 'Sort'}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" showCloseButton={false} className="w-56 p-0">
        <SheetHeader className="px-5 pt-6 pb-4">
          <SheetTitle>Sort by</SheetTitle>
        </SheetHeader>

        <div className="px-3 space-y-0.5">
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
      </SheetContent>
    </Sheet>
  );
}
