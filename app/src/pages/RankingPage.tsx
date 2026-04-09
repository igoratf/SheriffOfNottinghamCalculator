import { fetchMatches } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export const RankingPage = () => {
  const {
    data: matchesData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });

  if (error) return <p>Error: {error.message}</p>;

  const matches = matchesData?.data || [];

  return (
    <main className="flex items-center p-12 justify-start mt-auto min-h-screen flex-col">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ranking
        </h1>
        <h3 className="text-gray-500">View past games and scores</h3>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          {[...new Array(10)].map((_, index) => (
            <Skeleton className="h-12 w-lg" key={index} />
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-4">
        {matches.map((match) => (
          <li
            key={match.id}
            className="p-4 bg-gray-200 flex w-md justify-between rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <span className="flex-2 text-gray-800 font-medium">
              {new Date(match.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-left flex-1 text-gray-800 font-medium">
              Total score: {match.totalScore}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
};
