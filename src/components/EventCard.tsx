import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EventCardProps {
  imageUrl: string;
  imageAlt?: string;
  name: string;
  date: Date | string;
  climbingStyle: string;
  entryFee: number | string;
  className?: string;
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function formatFee(fee: number | string): string {
  if (typeof fee === 'string') return fee;
  return fee === 0 ? 'Free' : `$${fee}`;
}

export function EventCard({
  imageUrl,
  imageAlt = 'Event image',
  name,
  date,
  climbingStyle,
  entryFee,
  className,
}: EventCardProps) {
  return (
    <Card className={cn('flex-row gap-0 rounded-xl py-0', className)}>
      <div className="w-24 shrink-0 sm:w-36">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="ml-auto flex flex-col justify-center gap-1.5 py-4 text-right">
        <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription>{formatDate(date)}</CardDescription>
        <CardDescription className="capitalize">
          {climbingStyle}
        </CardDescription>
        <p className="text-sm font-medium">{formatFee(entryFee)}</p>
      </CardContent>
    </Card>
  );
}
