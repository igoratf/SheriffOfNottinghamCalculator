import classNames from "classnames";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

// TODO: Create shared types between frontend and backend

export const NewPlayerCard = ({ player }: { player: any }) => {
  const isFirst = false;
  const isTiedForFirst = false;
  const isSecond = false;

  console.log("MY PLAYER ", player);

  return (
    <Card
      className={classNames("max-h-120 w-70 relative h-max", {
        "inset-ring inset-ring-yellow-500/50": isFirst || isTiedForFirst,
        "inset-ring inset-ring-slate-500/50": isSecond,
      })}
    >
      <CardHeader>
        {/* {!matchScore && (
          <Button
            onClick={() => onDelete?.(player)}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-600/80 hover:text-white"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )} */}
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">{player.name}</span>
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
            🍎 Apple - {player.appleCount}{" "}
            <strong>({player.appleScore})</strong>
          </li>
          <li>
            🍞 Bread - {player.breadCount}{" "}
            <strong>({player.breadScore})</strong>
          </li>
          <li>
            🐔 Chicken - {player.chickenCount}{" "}
            <strong>({player.chickenScore})</strong>
          </li>
          <li>
            🧀 Cheese - {player.cheeseCount}{" "}
            <strong>({player.cheeseScore})</strong>
          </li>
          <li>
            🪙 Coin - {player.coins} <strong>({player.coins})</strong>
          </li>
        </ul>

        {/* {displayContrabandDetails(player.contrabands)} */}
      </CardContent>
      <Separator />
      <CardFooter>
        <div className="flex flex-col items-left">
          <span className="mt-2 text-md font-semibold">
            Final score: {player.score}
          </span>
        </div>
      </CardFooter>
      {/*  {playerScore && (
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
      )} */}
    </Card>
  );
};
