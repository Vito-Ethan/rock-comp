import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/g/$gymName/events/$eventId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/g/$gymName/events/$eventId"!</div>;
}
