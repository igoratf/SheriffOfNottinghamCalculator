import classNames from "classnames";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { capitalizeFirstLetter } from "@/utils/helpers";
import type { KingQueenResourceName } from "@/utils/types";

interface KingAndQueenPopoverProps {
  resource: KingQueenResourceName;
  kingList?: KingQueenResourceName[];
  queenList?: KingQueenResourceName[];
}

export const KingAndQueenPopover = ({
  resource,
  kingList,
  queenList,
}: KingAndQueenPopoverProps) => {
  const isKing = kingList?.includes(resource);
  const isQueen = queenList?.includes(resource);
  if (!isKing && !isQueen) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <span className="cursor-pointer hover:sc hover:translate-y-0.5 transition-transform duration-200">
          {isKing ? "🤴" : "👸"}
        </span>
      </PopoverTrigger>
      <PopoverContent
        className={classNames("p-2 w-max rounded-lg border-1 bg-white", {
          "border-amber-300": isKing,
          "border-slate-300": isQueen,
        })}
      >
        <p>
          {capitalizeFirstLetter(resource)} {isKing ? "king" : "queen"}
        </p>
      </PopoverContent>
    </Popover>
  );
};
