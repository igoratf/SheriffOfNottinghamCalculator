import type { KingQueenResourceName } from "@/utils/types";
import classNames from "classnames";
import { capitalizeFirstLetter } from "@/utils/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface KingOrQueenTooltipProps {
  resource: KingQueenResourceName;
  kingList?: KingQueenResourceName[];
  queenList?: KingQueenResourceName[];
}

export const KingOrQueenTooltip = ({
  resource,
  kingList,
  queenList,
}: KingOrQueenTooltipProps) => {
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
