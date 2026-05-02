import { PageLayout } from "@/components/PageLayout";
import { RankingPage } from "@/pages/RankingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ranking")({
  component: RankingComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page) || 1,
    };
  },
});

function RankingComponent() {
  return (
    <PageLayout>
      <RankingPage />
    </PageLayout>
  );
}
