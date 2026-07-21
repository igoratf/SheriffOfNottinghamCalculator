import { PageLayout } from "@/components/PageLayout";
import { MatchPage } from "@/pages/MatchPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/match/$matchId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <MatchPage />
    </PageLayout>
  );
}
