import { KINGS_AND_QUEENS_BONUS, RESOURCE_SCORE_MAP } from "./constants";
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

export function calculateScore(players: Player[]) {
  const playerScoreMap: Record<string, Record<string, number>> = players.map(
    (player) => {
      const score = calculatePlayerScore(player);
      return { [player.name]: score };
    }
  );

  console.log(playerScoreMap);

  const { kings, queens } = calculateKingsAndQueens(players);
  Object.entries(kings).forEach(([resource, kings]) => {
    if (kings.length === 1) {
      const kingName = kings[0].name;
      playerScoreMap[kingName]["total"] += KINGS_AND_QUEENS_BONUS[resource];
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

  let queens = {
    apple: [],
    bread: [],
    cheese: [],
    chicken: [],
  };

  const NOT_RESOURCE = ["name", "coin", "contraband"];

  players.forEach((player) => {
    Object.keys(player).forEach((key) => {
      if (!NOT_RESOURCE.includes(key)) {
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
