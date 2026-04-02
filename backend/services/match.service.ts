import { GOODS_SCORES, KINGS_BONUS, QUEENS_BONUS } from "../constants.js";
import type { KingQueenResourceName, Player, PlayerScore } from "../types.js";

export const calculateMatchScore = (players: Player[]) => {
  const matchPlayers = calculateGoodsScore(players);

  const { kings, queens } = calculateKingsAndQueens(matchPlayers);
  calculateKingQueenBonus(kings, queens);

  return matchPlayers;
};

export const calculateGoodsScore = (players: Player[]) => {
  const matchPlayers: PlayerScore[] = players.map((player) => {
    let totalScore = 0;
    totalScore += player.apple * GOODS_SCORES["apple"];
    totalScore += player.bread * GOODS_SCORES["bread"];
    totalScore += player.cheese * GOODS_SCORES["cheese"];
    totalScore += player.chicken * GOODS_SCORES["chicken"];
    totalScore += player.coin;
    if (player.contrabands) {
      totalScore += player.contrabands.reduce(
        (acc, curr) => acc + curr.quantity * curr.score,
        0,
      );
    }

    // Return player with total score and king/queen variables initialized to match PlayerScore format
    return { ...player, totalScore, king: [], queen: [] };
  });

  return matchPlayers;
};

export const calculateKingsAndQueens = (players: PlayerScore[]) => {
  players.forEach((player) => calculateContrabandBonus(player));

  const { max: appleMax, secondMax: appleSecondMax } = calculateResourcesMax(
    players,
    "apple",
  );
  const { max: breadMax, secondMax: breadSecondMax } = calculateResourcesMax(
    players,
    "bread",
  );

  const { max: cheeseMax, secondMax: cheeseSecondMax } = calculateResourcesMax(
    players,
    "cheese",
  );
  const { max: chickenMax, secondMax: chickenSecondMax } =
    calculateResourcesMax(players, "chicken");

  const kings: Record<KingQueenResourceName, PlayerScore[]> = {
    apple: [],
    bread: [],
    cheese: [],
    chicken: [],
  };
  const queens: Record<KingQueenResourceName, PlayerScore[]> = {
    apple: [],
    bread: [],
    cheese: [],
    chicken: [],
  };

  players.forEach((player) => {
    if (player.apple === appleMax) {
      kings.apple.push(player);
    } else if (kings.apple.length <= 1 && player.apple === appleSecondMax) {
      queens.apple.push(player);
    }

    if (player.bread === breadMax) {
      kings.bread.push(player);
    } else if (kings.bread.length <= 1 && player.bread === breadSecondMax) {
      queens.bread.push(player);
    }

    if (player.cheese === cheeseMax) {
      kings.cheese.push(player);
    } else if (kings.cheese.length <= 1 && player.cheese === cheeseSecondMax) {
      queens.cheese.push(player);
    }

    if (player.chicken === chickenMax) {
      kings.chicken.push(player);
    } else if (
      kings.chicken.length <= 1 &&
      player.chicken === chickenSecondMax
    ) {
      queens.chicken.push(player);
    }
  });

  return { kings, queens };
};

type KingsAndQueens = {
  [K in KingQueenResourceName]: PlayerScore[];
};

const calculateKingQueenBonus = (
  kings: KingsAndQueens,
  queens: KingsAndQueens,
) => {
  const kingsEntries = Object.entries(kings) as [
    KingQueenResourceName,
    PlayerScore[],
  ][];
  const queensEntries = Object.entries(queens) as [
    KingQueenResourceName,
    PlayerScore[],
  ][];

  kingsEntries.map(([resource, players]) => {
    let scoreBonus = 0;
    if (players.length > 1) {
      scoreBonus = Math.floor(
        (KINGS_BONUS[resource] + QUEENS_BONUS[resource]) /
          kings[resource].length,
      );
    } else if (players.length === 1) {
      scoreBonus = KINGS_BONUS[resource];
    }

    const playersWithBonus = players.map((player) => ({
      ...player,
      king: [...player.king, resource],
      totalScore: (player.totalScore += scoreBonus),
    }));

    return playersWithBonus;
  });

  queensEntries.map(([resource, players]) => {
    if (kings[resource].length > 1) return;

    const scoreBonus = Math.floor(QUEENS_BONUS[resource] / players.length);
    players.forEach((player) => {
      player.queen.push(resource);
      player.totalScore += scoreBonus;
    });
  });

  return { kingsEntries, queensEntries };
};

/**
 * Calculate players who have the most of each resource
 * @param players of the match
 * @param resource of calculation
 * @returns
 */
const calculateResourcesMax = (
  players: Player[],
  resource: KingQueenResourceName,
) => {
  players.sort((a, b) => b[resource] - a[resource]);

  const max = players.at(0)?.[resource] ?? 0;
  const secondMax = players.at(1)?.[resource] ?? 0;

  return { max, secondMax };
};

/**
 * Count bonus for contrabands that can be used as goods
 * @param player of the match
 * @returns player with goods count updated
 */
const calculateContrabandBonus = (player: Player) => {
  if (!player.contrabands?.length) return player;

  const playerContrabands = player.contrabands;
  const playerWithContrabandBonus = playerContrabands.map(
    (playerContraband) => {
      const { resourceType, resourceBonus } = playerContraband;
      if (resourceType && resourceBonus && resourceType in player) {
        return {
          ...player,
          [resourceType]: (player[resourceType as KingQueenResourceName] +=
            resourceBonus * playerContraband.quantity),
        };
      }

      return player;
    },
  );

  return playerWithContrabandBonus;
};
