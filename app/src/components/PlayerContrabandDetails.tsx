import type { PlayerContraband } from "@/utils/types";

interface PlayerContrabandDetailsProps {
  contrabands: PlayerContraband[];
}

const displayPlayerContraband = (playerContraband: PlayerContraband) => {
  return `${playerContraband.contraband?.name} x${playerContraband.quantity} -
              ${playerContraband.contraband.score * playerContraband.quantity}`;
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
          <li key={index} className="flex justify-between">
            <span>{displayPlayerContraband(playerContraband)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
