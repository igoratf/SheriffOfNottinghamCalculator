import { RESOURCE_SCORE_MAP } from "./constants";
import { type Player } from "./types";

//TODO: Fix types
export function calculatePlayerScore(player: Player) {
  let totalResourceScore: Record<string, number> = {};
  Object.keys(RESOURCE_SCORE_MAP).forEach((resource) => {
    if (resource in RESOURCE_SCORE_MAP) {
      totalResourceScore[resource] =
        (player[resource] || 0) * RESOURCE_SCORE_MAP[resource];
    }
  });
  totalResourceScore.total = Object.values(totalResourceScore).reduce(
    (acc, score) => acc + score,
    0
  );
  return totalResourceScore;
}
