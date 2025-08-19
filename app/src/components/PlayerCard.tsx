import type { Player } from "@/utils/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { calculatePlayerScore, capitalizeFirstLetter } from "@/utils/helpers";
import { TrashIcon } from "lucide-react";

export interface PlayerCardProps {
  player: Player;
  onDelete: (player: Player) => void;
  matchScore?: Record<string, Record<string, number>>;
  kingsAndQueens?: Record<string, Record<string, Player[]>>;
}

export const PlayerCard = ({
  player,
  matchScore,
  kingsAndQueens,
  onDelete,
}: PlayerCardProps) => {
  const playerScore = matchScore?.[player.name];
  const kings = kingsAndQueens?.kings || {};
  const queens = kingsAndQueens?.queens || {};

  const kingResources = Object.keys(kings).filter((resource) =>
    kings[resource].includes(player)
  );
  const queenResources = Object.keys(queens).filter((resource) =>
    queens[resource].includes(player)
  );

  console.log(kingResources, queenResources);

  return (
    <Card className="max-h-100 w-70 relative">
      <CardHeader>
        {!matchScore && (
          <Button
            onClick={() => onDelete?.(player)}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-600/80 hover:text-white"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            Apple - {player.apple} {playerScore && `(${playerScore.apple})`}
          </li>
          <li>
            Bread - {player.bread} {playerScore && `(${playerScore.bread})`}
          </li>
          <li>
            Chicken - {player.chicken}{" "}
            {playerScore && `(${playerScore.chicken})`}
          </li>
          <li>
            Cheese - {player.cheese} {playerScore && `(${playerScore.cheese})`}
          </li>
          <li>
            Coin - {player.coin} {playerScore && `(${playerScore.coin})`}
          </li>
          <li>
            Contraband - {player.contraband}{" "}
            {playerScore && `(${playerScore.contraband})`}
          </li>
        </ul>
      </CardContent>
      {playerScore && (
        <>
          <Separator className="mt-auto" />
          <CardFooter>
            <div className="flex flex-col items-left">
              <ul>
                {kingResources.map((resource) => (
                  <li key={resource} className="font-semibold text-yellow-500">
                    {capitalizeFirstLetter(resource)} king
                  </li>
                ))}
                {queenResources.map((resource) => (
                  <li key={resource} className="font-semibold text-slate-500">
                    {capitalizeFirstLetter(resource)} queen
                  </li>
                ))}
              </ul>
              <span className="mt-2 text-md font-semibold">
                Score: {playerScore.total}
              </span>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
