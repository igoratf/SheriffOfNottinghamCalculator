import type { Player } from "./MatchManager/MatchManager";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

export interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <Card className="place-self-center h-60 w-60">
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent>Player information here</CardContent>
      <Separator className="mt-auto" />
      <CardFooter>Score</CardFooter>
    </Card>
  );
};
