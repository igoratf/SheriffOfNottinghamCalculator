import { fetchMatchById } from "@/api/api";
import { PageHeader } from "@/components/PageHeader";
import { PlayerCard } from "@/components/PlayerCard/PlayerCard";
import { Spinner } from "@/components/ui/spinner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { PlayerScore } from "@/utils/types";
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
  const sortedPlayers = players?.sort((a, b) => b.score - a.score) || [];

  const isTiedForFirst = (player: PlayerScore) => {
    const firstPlaceScore = sortedPlayers[0]?.score;
    const secondPlaceScore = sortedPlayers[1]?.score;
    return (
      player.score === firstPlaceScore && firstPlaceScore === secondPlaceScore
    );
  };

  const isSecond = (player: PlayerScore) => {
    if (isTiedForFirst(player)) return false;

    const secondPlaceScore = sortedPlayers[1]?.score;
    return player.score === secondPlaceScore;
  };

  const isFirst = (player: PlayerScore) => {
    if (isTiedForFirst(player)) return false;

    const firstPlaceScore = sortedPlayers[0]?.score;
    return player.score === firstPlaceScore;
  };

  return (
    <TooltipProvider>
      <main className="flex items-center p-6 justify-start mt-auto min-h-screen flex-col">
        <header className="text-center mb-8">
          <PageHeader title="Match" />
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

        <div className="flex flex-col mt-6">
          <PageHeader title="Players" size="sm" className="text-center" />
          <ul className="flex flex-col md:flex-row gap-6 mt-2">
            {sortedPlayers.map((player) => (
              <PlayerCard
                player={player}
                key={player.id}
                isFirst={isFirst(player)}
                isSecond={isSecond(player)}
                isTiedForFirst={isTiedForFirst(player)}
              />
            ))}
          </ul>
        </div>
      </main>
    </TooltipProvider>
  );
};
