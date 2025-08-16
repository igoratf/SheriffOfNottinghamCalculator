import {
  KINGS_AND_QUEENS_BONUS,
  RESOURCE_NAMES,
  RESOURCE_SCORE_MAP,
} from "./constants";
import { type Player } from "./types";

//TODO: Fix types
export function calculatePlayerScore(player: Player) {
  let totalResourceScore: Record<string, number> = {};
  Object.keys(RESOURCE_SCORE_MAP).forEach((resource) => {
    totalResourceScore[resource] =
      (player[resource] || 0) * RESOURCE_SCORE_MAP[resource];
  });
  totalResourceScore.total = Object.values(totalResourceScore).reduce(
    (acc, score) => acc + score,
    0
  );

  return totalResourceScore;
}

export function calculateScore(players: Player[]) {
  const playerScoreMap: Record<string, Record<string, number>> = players.reduce(
    (acc, player) => {
      const score = calculatePlayerScore(player);
      return { ...acc, [player.name]: score };
    },
    {}
  );

  const { kings, queens } = calculateKingsAndQueens(players);

  RESOURCE_NAMES.forEach((resource) => {
    const resourceKings = kings[resource];
    const resourceQueens = queens[resource];

    const kingBonus = KINGS_AND_QUEENS_BONUS["king"][resource];
    const queenBonus = KINGS_AND_QUEENS_BONUS["queen"][resource];
    if (resourceKings.length === 1) {
      const kingName = resourceKings[0].name;
      playerScoreMap[kingName]["total"] += kingBonus;

      if (resourceQueens.length === 1) {
        const queenName = resourceQueens[0].name;
        playerScoreMap[queenName]["total"] += queenBonus;
      } else if (resourceQueens.length > 1) {
        const totalBonus = Math.floor(queenBonus / resourceQueens.length);
        resourceQueens.forEach(
          (player) => (playerScoreMap[player.name]["total"] += totalBonus)
        );
      }
      // If there are multiple kings, the king and queen bonus are added and split between them. There's no payout for queens
    } else {
      const totalBonus = Math.floor(
        (kingBonus + queenBonus) / resourceKings.length
      );
      resourceKings.forEach(
        (player) => (playerScoreMap[player.name]["total"] += totalBonus)
      );
    }
  });

  return playerScoreMap;
}

export function calculateKingsAndQueens(players: Player[]) {
  let kings: Record<string, Player[]> = {
    apple: [],
    bread: [],
    cheese: [],
    chicken: [],
  };

  let queens: Record<string, Player[]> = {
    apple: [],
    bread: [],
    cheese: [],
    chicken: [],
  };

  players.forEach((player) => {
    Object.keys(player).forEach((key) => {
      if (RESOURCE_NAMES.includes(key)) {
        return compareResourceScore(kings, queens, key, player);
      }
    });
  });

  return { kings, queens };
}

function compareResourceScore(
  kingsMap: Record<string, Player[]>,
  queensMap: Record<string, Player[]>,
  resource: string,
  player: Player
) {
  const resourceKings = kingsMap[resource];
  const resourceQueens = queensMap[resource];

  const currentKing = resourceKings[0];
  const currentQueen = resourceQueens[0];

  const playerResource = player[resource];

  // If there's no king, the player becomes king
  if (!currentKing) {
    return (kingsMap[resource] = [player]);
  }

  /* If the player has more goods than the current king, it becomes king
   and previous king becomes queen */
  if (playerResource > currentKing[resource]) {
    kingsMap[resource] = [player];
    queensMap[resource] = [currentKing];

    /* If player has the same amount as the king, it's a tie and there is no queen */
  } else if (playerResource === currentKing[resource]) {
    kingsMap[resource].push(player);
    queensMap[resource] = [];
  } else if (resourceQueens.length === 0)
    return (queensMap[resource] = [player]);
  else if (playerResource > currentQueen[resource])
    queensMap[resource] = [player];
  else if (playerResource === currentQueen[resource])
    queensMap[resource].push(player);
}
