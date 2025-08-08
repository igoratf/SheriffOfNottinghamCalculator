import type { Player } from "@/utils/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { calculatePlayerScore } from "@/utils/helpers";

export interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const playerScore = calculatePlayerScore(player);
  const { apple, bread, chicken, cheese, coin, contraband, total } =
    playerScore;

  return (
    <Card className="place-self-center h-80 w-70">
      <CardHeader>
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
