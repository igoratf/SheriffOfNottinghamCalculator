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
import { calculatePlayerScore } from "@/utils/helpers";
import { TrashIcon } from "lucide-react";

export interface PlayerCardProps {
  player: Player;
  onDelete: (player: Player) => void;
}

export const PlayerCard = ({ player, onDelete }: PlayerCardProps) => {
  const playerScore = calculatePlayerScore(player);
  const { apple, bread, chicken, cheese, coin, contraband, total } =
    playerScore;

  return (
    <Card className="place-self-center h-80 w-70 relative">
      <CardHeader>
        <Button
          onClick={() => onDelete?.(player)}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-600 hover:text-white"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            Apple - {player.apple} ({apple})
          </li>
          <li>
            Bread - {player.bread} ({bread})
          </li>
          <li>
            Chicken - {player.chicken} ({chicken})
          </li>
          <li>
            Cheese - {player.cheese} ({cheese})
          </li>
          <li>
            Coin - {player.coin} ({coin})
          </li>
          <li>
            Contraband - {player.contraband} ({contraband})
          </li>
        </ul>
      </CardContent>
      <Separator className="mt-auto" />
      <CardFooter>Score: {total}</CardFooter>
    </Card>
  );
};
