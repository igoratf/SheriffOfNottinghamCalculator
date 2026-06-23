import { fetchMatches } from "@/api/api";
import { PaginationHandler } from "@/components/PaginationHandler";
import { RankingFilters } from "@/components/RankingFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Route } from "@/routes/ranking";
import type { Match, Player } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export const RankingPage = () => {
  const { page, filter, dateFrom, dateTo } = Route.useSearch();

  const { data, error, isLoading } = useQuery({
    queryKey: ["matches", page, filter, dateFrom, dateTo],
    queryFn: () => fetchMatches({ page, filter, dateFrom, dateTo }),
  });

  if (error) return <p>Error: {error.message}</p>;

  const matches = data?.matches?.data || [];
  const pagination = data?.matches?.pagination;

  return (
    <main className="flex items-center p-6 justify-start mt-auto min-h-screen flex-col">
      <header className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ranking
        </h1>
        <h3 className="text-gray-500">View past games and scores</h3>
      </header>

      <RankingFilters />

      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          {[...new Array(10)].map((_, index) => (
            <Skeleton className="h-12 w-lg" key={index} />
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-4">
        {/* TODO: Create FE type or schema from backend */}
        {matches.map((match: Match) => (
          <Link
            to={`/match/$matchId`}
            params={{ matchId: match.id.toString() }}
            key={match.id}
            className="px-4 py-2 bg-slate-200 flex flex-col w-md gap-4 rounded-lg cursor-pointer hover:bg-slate-300  transition-colors"
          >
            <div className="flex justify-between">
              <span className="flex-2 text-gray-600 font-medium">
                {new Date(match.createdAt).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-left flex-1 text-gray-800 font-medium">
                Total score: {match.totalScore}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {match.players.map((player: Player) => player.name).join(", ")}
            </p>
          </Link>
        ))}
      </ul>
      <PaginationHandler
        className="mt-4"
        currentPage={page}
        numberOfPages={pagination?.numberOfPages || 1}
      />
    </main>
  );
};
