import { KingQueenBonusCategory } from "@/utils/constants";
import type { KingQueenResourceName, KingQueenBonus } from "@/utils/types";
import { InfoIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface KingQueenBonusItemProps {
  resource: KingQueenResourceName;
  bonus: KingQueenBonus;
}
const formatKingQueenType = (type: KingQueenBonusCategory) => {
  switch (type) {
    case KingQueenBonusCategory.KING:
      return "king";
    case KingQueenBonusCategory.QUEEN:
      return "queen";
    case KingQueenBonusCategory.KING_QUEEN:
      return "king and queen";
    default:
      return "";
  }
};

export const KingQueenBonusItem = ({
  resource,
  bonus,
}: KingQueenBonusItemProps) => {
  const { type, score } = bonus;

  if (type === KingQueenBonusCategory.KING_QUEEN) {
    return (
      <li className="flex items-center space-x-2 text-yellow-600 text-sm">
        <span>{`+${score} ${resource} ${formatKingQueenType(type)}`}</span>

        <Popover>
          <PopoverTrigger>
            <InfoIcon className="h-4 w-4 text-orange-800 cursor-pointer hover:text-amber-600 transition-colors duration-200" />
          </PopoverTrigger>
          <PopoverContent className="p-2 rounded-lg border-1 bg-white">
            <p className="text-sm text-gray-500">
              If 2 or more players are tied as king they become king and queen
              and share the bonus points.
            </p>
          </PopoverContent>
        </Popover>
      </li>
    );
  }

  return (
    <li>
      {type} + ${score}
    </li>
  );
};
