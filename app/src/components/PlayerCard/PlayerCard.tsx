import type { PlayerScore } from "@/utils/types.d";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { TrashIcon } from "lucide-react";
import classNames from "classnames";
import { PlayerContrabandDetails } from "./PlayerContrabandDetails";
import { RoyalGoodBonusBadge } from "./RoyalGoodBonusBadge";
import { KingAndQueenPopover } from "./KingAndQueenPopover";

export interface PlayerCardProps {
  player: PlayerScore;
  isFirst?: boolean;
  isTiedForFirst?: boolean;
  isSecond?: boolean;
  onDelete?: (player: PlayerScore) => void;
}

export const PlayerCard = ({
  player,
  isFirst,
  isSecond,
  isTiedForFirst,
  onDelete,
}: PlayerCardProps) => {
  const totalContrabandScore = player.contrabands?.reduce(
    (total, c) => total + c.score * c.quantity,
    0,
  );

  return (
    <Card
      className={classNames("max-h-140 w-70 relative h-max", {
        "inset-ring inset-ring-yellow-500/50": isFirst || isTiedForFirst,
        "inset-ring inset-ring-slate-500/50": isSecond,
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
            {isFirst && (
              <span className=" text-yellow-500 ml-auto">Winner! 👑</span>
            )}
            {isTiedForFirst && (
              <span className="text-yellow-500 ml-auto">Winner tie!</span>
            )}
            {isSecond && (
              <span className="text-slate-600 ml-auto">2nd place! 🥈</span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="space-x-1 flex items-center">
            <span>🍎 Apples - {player.apple}</span>
            {player.score && (
              <span>
                <strong>{`(${player.appleScore})`}</strong>
              </span>
            )}
            {player.bonus?.apple && (
              <RoyalGoodBonusBadge bonus={player.bonus.apple} />
            )}
            <KingAndQueenPopover
              resource="apple"
              kingList={player.king}
              queenList={player.queen}
            />
          </li>
          <li className="space-x-1 flex items-center">
            <span>🍞 Bread - {player.bread} </span>
            {player.score && (
              <span className="font-bold">{`(${player.breadScore})`}</span>
            )}
            {player.bonus?.bread && (
              <RoyalGoodBonusBadge bonus={player.bonus.bread} />
            )}
            <KingAndQueenPopover
              resource="bread"
              kingList={player.king}
              queenList={player.queen}
            />
          </li>
          <li className="space-x-1 flex items-center">
            <span>🧀 Cheese - {player.cheese} </span>
            {player.score && (
              <span className="font-bold">{`(${player.cheeseScore})`}</span>
            )}
            {player.bonus?.cheese && (
              <RoyalGoodBonusBadge bonus={player.bonus.cheese} />
            )}
            <KingAndQueenPopover
              resource="cheese"
              kingList={player.king}
              queenList={player.queen}
            />
          </li>
          <li className="space-x-1 flex items-center">
            <span>🐔 Chicken - {player.chicken} </span>
            {player.score && (
              <span className="font-bold">{`(${player.chickenScore})`}</span>
            )}
            {player.bonus?.chicken && (
              <RoyalGoodBonusBadge bonus={player.bonus.chicken} />
            )}
            <KingAndQueenPopover
              resource="chicken"
              kingList={player.king}
              queenList={player.queen}
            />
          </li>
          <li className="space-x-1 flex items-center">
            <span>🪙 Coins - {player.coins} </span>
            {player.score && (
              <span className="font-bold">{`(${player.coins})`}</span>
            )}
          </li>
          <li className="space-x-1 flex items-center">
            <span>💼 Contraband - {totalContrabandScore} </span>
            {player.score && (
              <span className="font-bold">{`(${totalContrabandScore})`}</span>
            )}
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
