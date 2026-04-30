import type { PlayerContraband } from "@/utils/types";

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
      <ul className="text-sm space-y-1">
        {contrabands.map((playerContraband, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="text-gray-600">
              {displayPlayerContraband(playerContraband)}
            </span>
            <span className="text-amber-500">
              {displayContrabandResourceBonus(playerContraband)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
