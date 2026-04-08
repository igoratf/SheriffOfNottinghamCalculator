import { PageLayout } from "@/components/PageLayout";
import { HomePage } from "@/pages/HomePage";
import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <PageLayout>
        <HomePage />
      </PageLayout>
      <Analytics />
    </main>
  );
}
