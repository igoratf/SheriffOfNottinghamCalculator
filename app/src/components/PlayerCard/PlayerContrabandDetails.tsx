import type { PlayerContraband } from "@/utils/types";
import { InfoIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface PlayerContrabandDetailsProps {
  contrabands: PlayerContraband[];
}

const displayPlayerContraband = (playerContraband: PlayerContraband) => {
  return `${playerContraband.name} x${playerContraband.quantity} -
              ${playerContraband.score * playerContraband.quantity}`;
};

const displayContrabandResourceBonus = (playerContraband: PlayerContraband) => {
  if (!playerContraband.resourceBonus || !playerContraband.resourceType) return;

  return `(+${playerContraband.resourceBonus * playerContraband.quantity} ${playerContraband.resourceType})`;
};

export const PlayerContrabandDetails = ({
  contrabands,
}: PlayerContrabandDetailsProps) => {
  if (!contrabands || contrabands.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="font-medium text-sm mb-2">Contrabands:</h4>
      <ul className="text-xs space-y-1">
        {contrabands.map((playerContraband, index) => (
          <li key={index} className="flex items-center justify-between gap-2">
            <span className="text-gray-600">
              {displayPlayerContraband(playerContraband)}
            </span>
            <span className="text-amber-500 shrink-0">
              {displayContrabandResourceBonus(playerContraband)}
            </span>

            <Popover>
              <PopoverTrigger>
                <InfoIcon className="h-4 w-4 text-orange-800 cursor-pointer hover:text-amber-600 transition-colors duration-200" />
              </PopoverTrigger>
              <PopoverContent className="p-2 rounded-lg border-1 bg-white">
                <p className="text-sm text-gray-500">
                  Bonus from royal goods only counts for king and queen bonus
                  and do not score extra points.
                </p>
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>
    </div>
  );
};
