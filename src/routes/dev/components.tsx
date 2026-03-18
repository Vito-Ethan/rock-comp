import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { EventCard } from '@/components/EventCard';
import {
  EventFilters,
  type EventFiltersValue,
} from '@/components/EventFilters';
import { SortByDrawer } from '@/components/SortByDrawer';
import { SortBySheet } from '@/components/SortBySheet';
import { type SortValue } from '@/components/SortByDrawer';

export const Route = createFileRoute('/dev/components')({
  component: RouteComponent,
});

function RouteComponent() {
  const [filters, setFilters] = React.useState<EventFiltersValue | undefined>();
  const [sortDrawer, setSortDrawer] = React.useState<SortValue | undefined>();
  const [sortSheet, setSortSheet] = React.useState<SortValue | undefined>();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">EventFilters</h2>
        <div className="flex items-center gap-4">
          <EventFilters value={filters} onChange={setFilters} />
          {filters && (
            <pre className="text-muted-foreground text-xs">
              {JSON.stringify(filters, null, 2)}
            </pre>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          SortBy — Drawer
        </h2>
        <SortByDrawer value={sortDrawer} onChange={setSortDrawer} />
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          SortBy — Sheet
        </h2>
        <SortBySheet value={sortSheet} onChange={setSortSheet} />
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">EventCard</h2>
        <div className="space-y-3 max-w-xl">
          <EventCard
            imageUrl="https://placehold.co/144x128/6366f1/ffffff?text=Event"
            name="Boulder Bash Open 2026"
            date={new Date('2026-04-12')}
            climbingStyle="bouldering"
            entryFee={25}
          />
          <EventCard
            imageUrl="https://placehold.co/144x128/0ea5e9/ffffff?text=Event"
            name="Spring Lead Classic"
            date={new Date('2026-05-03')}
            climbingStyle="lead"
            entryFee={0}
          />
          <EventCard
            imageUrl="https://placehold.co/144x128/10b981/ffffff?text=Event"
            name="Speed & Power Invitational"
            date={new Date('2026-06-21')}
            climbingStyle="speed"
            entryFee={40}
          />
          <EventCard
            imageUrl="https://placehold.co/144x128/f59e0b/ffffff?text=Event"
            name="The Annual Rocky Mountain Regional Open Bouldering Championship Series 2026"
            date={new Date('2026-07-18')}
            climbingStyle="bouldering"
            entryFee={55}
          />
        </div>
      </section>
    </div>
  );
}
