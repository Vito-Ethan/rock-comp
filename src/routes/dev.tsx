import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dev')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-foreground mb-1 text-2xl font-bold">Dev</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Component library and debug views
        </p>
        <Outlet />
      </div>
    </div>
  );
}
