import type {
  Player,
  PlayerScore,
  KingsAndQueens,
  KingQueenResourceName,
} from "@/utils/types.d";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { TrashIcon } from "lucide-react";
import { useMemo } from "react";
import classNames from "classnames";

export interface PlayerCardProps {
  player: Player;
  index: number;
  onDelete: (player: Player) => void;
  matchScore?: Record<string, PlayerScore>;
  kingsAndQueens?: KingsAndQueens;
}

export const PlayerCard = ({
  player,
  matchScore,
  kingsAndQueens,
  index,
  onDelete,
}: PlayerCardProps) => {
  const playerScore = matchScore?.[player.name];

  const kings = useMemo(
    () =>
      kingsAndQueens?.kings || ({} as Record<KingQueenResourceName, Player[]>),
    [kingsAndQueens?.kings]
  );
  const queens = useMemo(
    () =>
      kingsAndQueens?.queens || ({} as Record<KingQueenResourceName, Player[]>),
    [kingsAndQueens?.queens]
  );

  const kingResources = useMemo(
    () =>
      Object.keys(kings).filter((resource) =>
        kings[resource as KingQueenResourceName].includes(player)
      ),
    [kings, player]
  );
  const queenResources = useMemo(
    () =>
      Object.keys(queens).filter((resource) =>
        queens[resource as KingQueenResourceName].includes(player)
      ),
    [queens, player]
  );

  const isTiedForFirst = useMemo(() => {
    if (!matchScore) return false;
    const allScores = Object.values(matchScore).map((score) => score.total);
    const highestScore = Math.max(...allScores);
    return allScores.filter((score) => score === highestScore).length > 1;
  }, [matchScore]);

  const isFirst = index === 0 && !!playerScore && !isTiedForFirst;
  const isSecond = index === 1 && !!playerScore && !isTiedForFirst;

  return (
    <Card
      className={classNames("max-h-110 w-70 relative h-max", {
        "inset-ring inset-ring-yellow-500/50": isFirst || isTiedForFirst,
        "inset-ring inset-ring-slate-500/50": isSecond,
      })}
    >
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
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{player.name}</span>
            {isFirst && <span className="text-yellow-500">Winner! 👑</span>}
            {isTiedForFirst && (
              <span className="text-yellow-500">Tied for 1st!</span>
            )}
            {isSecond && <span className="text-slate-600">2nd place</span>}
          </div>
        </CardTitle>
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

        {player.contrabands && player.contrabands.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Detailed Contrabands:</h4>
            <ul className="text-sm space-y-1">
              {player.contrabands.map((playerContraband, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {playerContraband.contraband.name} x
                    {playerContraband.quantity}
                  </span>
                  <span className="text-muted-foreground">
                    (
                    {playerContraband.contraband.score *
                      playerContraband.quantity}{" "}
                    pts
                    {playerContraband.contraband.resourceBonus &&
                      playerContraband.contraband.resourceType &&
                      `, +${
                        playerContraband.contraband.resourceBonus *
                        playerContraband.quantity
                      } ${playerContraband.contraband.resourceType}`}
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
