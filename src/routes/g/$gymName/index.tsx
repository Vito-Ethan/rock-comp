import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/g/$gymName/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/g/$gymName/"!
      <Outlet />
    </div>
  );
}
