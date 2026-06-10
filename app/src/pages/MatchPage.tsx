import { fetchMatchById } from "@/api/api";
import { NewPlayerCard } from "@/components/NewPlayerCard";
import { PlayerCard } from "@/components/PlayerCard";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export const MatchPage = () => {
  const { matchId } = useParams({ strict: false });

  const { data, error, isLoading } = useQuery({
    queryKey: ["matchById", matchId],
    queryFn: () => fetchMatchById(matchId ?? ""),
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading || !data)
    return (
      <div className="flex mt-48 justify-center items-center">
        <Spinner className="size-8" />
      </div>
    );

  const { totalScore, createdAt, players } = data.match;

  return (
    <main className="flex items-center p-6 justify-start mt-auto min-h-screen flex-col">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Match
        </h1>
        <h3 className="text-gray-500">View detailed match information</h3>
      </header>

      <div className="text-center">
        <p className="text-gray-500 font-semibold">
          {new Date(createdAt).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="font-semibold text-yellow-500">
          Total match score: {totalScore}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center">Players</h2>
        <ul className="flex gap-6 mt-2">
          {players?.map((player) => (
            <PlayerCard player={player} key={player.id} />
          ))}
        </ul>
      </div>
    </main>
  );
};
