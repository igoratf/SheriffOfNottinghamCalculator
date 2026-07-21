import { PageLayout } from "@/components/PageLayout";
import { RankingPage } from "@/pages/RankingPage";
import { createFileRoute } from "@tanstack/react-router";

type RankingSearch = {
  page: number;
  players?: string;
  dateTo?: string;
  dateFrom?: string;
};

export const Route = createFileRoute("/ranking")({
  component: RankingComponent,
  validateSearch: (search: RankingSearch) => {
    return {
      page: Number(search.page) || 1,
      players: search.players,
      dateTo: search.dateTo,
      dateFrom: search.dateFrom,
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
