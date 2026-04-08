import { PageLayout } from "@/components/PageLayout";
import { RankingPage } from "@/pages/RankingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ranking")({
  component: RankingComponent,
});

function RankingComponent() {
  return (
    <PageLayout>
      <RankingPage />
    </PageLayout>
  );
}
