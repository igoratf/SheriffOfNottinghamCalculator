import { type Request, type Response } from "express";
import type { KingQueenResourceName, Player, PlayerScore } from "../types.js";
import { GOODS_SCORES, KINGS_BONUS, QUEENS_BONUS } from "../constants.js";

export const saveMatch = (req: Request, res: Response) => {
  const matchPlayers = calculateGoodsScore(req.body.players);

  calculateKingsAndQueens(matchPlayers);
  res.json({ data: "This is a test" });
};

const calculateGoodsScore = (players: Player[]) => {
  const matchPlayers: PlayerScore[] = players.map((player) => {
    let totalScore = 0;
    totalScore += player.apple * GOODS_SCORES["apple"];
    totalScore += player.bread * GOODS_SCORES["bread"];
    totalScore += player.cheese * GOODS_SCORES["cheese"];
    totalScore += player.chicken * GOODS_SCORES["chicken"];
    totalScore += player.coin;
    totalScore += player.contrabands.reduce(
      (acc, curr) => acc + curr.quantity * curr.score,
      0,
    );

    return { ...player, totalScore };
  });

  console.log("MATCH PLAYERS ", matchPlayers);

  return matchPlayers;
};

export const calculateKingsAndQueens = (players: PlayerScore[]) => {
  console.log("previous ", players.at(-1));
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

  return calculateKingQueenBonus(kings, queens);
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

    players.forEach((player) => (player.totalScore += scoreBonus));
  });

  queensEntries.map(([resource, players]) => {
    if (kings[resource].length > 1) return;

    const scoreBonus = Math.floor(QUEENS_BONUS[resource] / players.length);
    players.forEach((player) => (player.totalScore += scoreBonus));
  });

  return { kingsEntries, queensEntries };
};

const calculateResourcesMax = (
  players: Player[],
  resource: KingQueenResourceName,
) => {
  let max = 0;
  let secondMax = 0;

  players.forEach((player) => {
    if (player[resource] > max) {
      max = player[resource];
    } else if (player[resource] > secondMax) {
      secondMax = player[resource];
    }
  });

  return { max, secondMax };
};

/**
 * Count bonus for contrabands that can be used as goods
 * @param player of the match
 * @returns player with goods count updated
 */
const calculateContrabandBonus = (player: Player) => {
  const playerContrabands = player.contrabands;
  playerContrabands.map((playerContraband) => {
    const { resourceType, resourceBonus } = playerContraband;
    if (resourceType && resourceBonus && resourceType in player) {
      player[resourceType as KingQueenResourceName] +=
        resourceBonus * playerContraband.quantity;
    }
  });

  // Initialize total score count
  return player;
};
