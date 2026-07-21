import type { KingQueenResourceName, PlayerScore } from "@/utils/types.d";
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
import { capitalizeFirstLetter } from "@/utils/helpers";
import { Tooltip } from "./ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

export interface PlayerCardProps {
  player: PlayerScore;
  onDelete?: (player: PlayerScore) => void;
}

const isKingOrQueen = (
  resource: KingQueenResourceName,
  kingList?: KingQueenResourceName[],
  queenList?: KingQueenResourceName[],
) => {
  const isKing = kingList?.includes(resource);
  const isQueen = queenList?.includes(resource);
  if (!isKing && !isQueen) return null;

  return (
    <Tooltip>
      <TooltipTrigger>
        <span className="ml-2">{isKing ? "🤴" : "👸"}</span>
      </TooltipTrigger>
      <TooltipContent
        className={classNames("p-2 rounded-lg border-1 bg-white", {
          "border-amber-300": isKing,
          "border-slate-300": isQueen,
        })}
      >
        {capitalizeFirstLetter(resource)} {isKing ? "king" : "queen"}
      </TooltipContent>
    </Tooltip>
  );
};

export const PlayerCard = ({ player, onDelete }: PlayerCardProps) => {
  const totalContrabandScore = player.contrabands?.reduce(
    (total, c) => total + c.score * c.quantity,
    0,
  );

  console.log("Player ", player);

  return (
    <Card
      className={classNames("max-h-140 w-70 relative h-max", {
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
            {isKingOrQueen("apple", player.king, player.queen)}
          </li>
          <li>
            🍞 Bread - {player.bread}{" "}
            {player.breadScore && <strong>{`(${player.breadScore})`}</strong>}
            {isKingOrQueen("bread", player.king, player.queen)}
          </li>
          <li>
            🧀 Cheese - {player.cheese}{" "}
            {player.cheeseScore && <strong>{`(${player.cheeseScore})`}</strong>}
            {isKingOrQueen("cheese", player.king, player.queen)}
          </li>
          <li>
            🐔 Chicken - {player.chicken}{" "}
            {player.chickenScore && (
              <strong>{`(${player.chickenScore})`}</strong>
            )}
            {isKingOrQueen("chicken", player.king, player.queen)}
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
            <span className="mt-2 text-md font-semibold">
              Score: {player.score}
            </span>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
