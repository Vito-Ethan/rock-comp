import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(notFound)/$')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$"!</div>;
}
