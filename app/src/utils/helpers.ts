import type { PlayerFormData } from "./schemas";

/**
 * Flattens contraband data to match backend format
 * @param players of the match
 * @returns player with contrabands data flattened
 */
export const formatPlayersContrabandData = (player: PlayerFormData) => {
  const formattedData = {
    ...player,
    contrabands:
      player.contrabands?.map((contraband) => ({
        ...contraband.contraband,
        quantity: contraband.quantity,
      })) || [],
  };

  return formattedData;
};

export function capitalizeFirstLetter(resource: string) {
  return resource.charAt(0).toUpperCase() + resource.slice(1);
}
