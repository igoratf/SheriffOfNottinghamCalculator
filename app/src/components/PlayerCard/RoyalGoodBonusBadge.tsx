import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const RoyalGoodBonusBadge = ({ bonus }: { bonus: number }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Badge
          variant="outline"
          className="text-amber-500 bg-amber-500/10 border-amber-500/20 hover:cursor-pointer hover:bg-amber-500/5 hover:-translate-y-0.5 transition-transform duration-200"
        >
          +{bonus}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="p-2 rounded-lg border-1 bg-white">
        <p className="text-sm text-gray-500">Bonus from royal goods.</p>
      </PopoverContent>
    </Popover>
  );
};
