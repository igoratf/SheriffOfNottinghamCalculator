import type { PlayerScore } from "@/utils/types.d";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { TrashIcon } from "lucide-react";
import classNames from "classnames";
import { PlayerContrabandDetails } from "./PlayerContrabandDetails";

export interface PlayerCardProps {
  player: PlayerScore;
  onDelete?: (player: PlayerScore) => void;
}

export const PlayerCard = ({ player, onDelete }: PlayerCardProps) => {
  console.log("pLAYER ", player);

  const totalContrabandScore = player.contrabands?.reduce(
    (total, c) => total + c.score * c.quantity,
    0,
  );

  return (
    <Card
      className={classNames("max-h-120 w-70 relative h-max", {
        /*         "inset-ring inset-ring-yellow-500/50": isFirst || isTiedForFirst,
        "inset-ring inset-ring-slate-500/50": isSecond, */
      })}
    >
      <CardHeader>
        {!player.score && (
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
            {/*  {isFirst && <span className="text-yellow-500">Winner! 👑</span>}
            {isTiedForFirst && (
              <span className="text-yellow-500">Tied for 1st!</span>
            )}
            {isSecond && <span className="text-slate-600">2nd place</span>} */}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            🍎 Apples - {player.apple}{" "}
            {player.appleScore && <strong>{`(${player.appleScore})`}</strong>}
          </li>
          <li>
            🍞 Bread - {player.bread}{" "}
            {player.breadScore && <strong>{`(${player.breadScore})`}</strong>}
          </li>
          <li>
            🧀 Cheese - {player.cheese}{" "}
            {player.cheeseScore && <strong>{`(${player.cheeseScore})`}</strong>}
          </li>
          <li>
            🐔 Chicken - {player.chicken}{" "}
            {player.cheeseScore && (
              <strong>{`(${player.chickenScore})`}</strong>
            )}
          </li>
          <li>
            🪙 Coins - {player.coins}{" "}
            {player.score && <strong>{`(${player.coins})`}</strong>}
          </li>
          <li>
            💼 Contraband - {totalContrabandScore}{" "}
            {player.score && <strong>{`(${totalContrabandScore})`}</strong>}
          </li>
        </ul>

        {player.contrabands?.length > 0 && <Separator className="mt-4" />}

        <PlayerContrabandDetails contrabands={player.contrabands} />
      </CardContent>
      {player.score && (
        <>
          <div className="px-6">
            <Separator className="mt-auto px-6" />
          </div>
          <CardFooter>
            <div className="flex flex-col items-left">
              <ul>
                {/*  {kingResources.map((resource) => (
                  <li key={resource} className="font-semibold text-yellow-500">
                    {capitalizeFirstLetter(resource)} king
                  </li>
                ))}
                {queenResources.map((resource) => (
                  <li key={resource} className="font-semibold text-slate-500">
                    {capitalizeFirstLetter(resource)} queen
                  </li>
                ))} */}
              </ul>
              <span className="mt-2 text-md font-semibold">
                Score: {player.score}
              </span>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
