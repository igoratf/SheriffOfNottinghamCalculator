import type { PlayerContraband } from "@/utils/types";

interface PlayerContrabandDetailsProps {
  contrabands: PlayerContraband[];
}

export const PlayerContrabandDetails = ({
  contrabands,
}: PlayerContrabandDetailsProps) => {
  if (!contrabands || contrabands.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="font-medium text-sm mb-2">Detailed Contrabands:</h4>
      <ul className="text-sm space-y-1">
        {contrabands.map((playerContraband, index) => (
          <li key={index} className="flex justify-between">
            <span>
              {playerContraband.contraband?.name} x{playerContraband.quantity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
