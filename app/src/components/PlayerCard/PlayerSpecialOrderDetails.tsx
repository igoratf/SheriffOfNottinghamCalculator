import type { PlayerSpecialOrder } from "@/utils/types";
import { Separator } from "../ui/separator";

interface PlayerSpecialOrderDetailsProps {
  specialOrders: PlayerSpecialOrder[];
}

export const PlayerSpecialOrderDetails = ({
  specialOrders,
}: PlayerSpecialOrderDetailsProps) => {
  if (specialOrders.length === 0) return null;

  return (
    <>
      <Separator className="mt-4 " />
      <div className="mt-4">
        <h4 className="font-medium text-sm mb-2">Special orders:</h4>

        <ul className="text-xs space-y-1">
          {specialOrders.map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-gray-600">{order.name}</span>
              <span className="text-yellow-500">{`(+ ${order.value})`}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
