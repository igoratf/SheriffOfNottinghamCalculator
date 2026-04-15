import { PrismaPg } from "@prisma/adapter-pg";
import { GOODS_SCORES, KINGS_BONUS, QUEENS_BONUS } from "../constants.js";
import type { KingQueenResourceName, Player, PlayerScore } from "../types.js";
import { PrismaClient, type Match } from "@prisma/client";
import type { MatchWithPlayers } from "./types.js";
import { AppError } from "../utils/AppError.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

export const calculateMatchScore = async (players: Player[]) => {
  const matchPlayers = await calculateGoodsScore(players);

  const { kings, queens } = calculateKingsAndQueens(matchPlayers);
  calculateKingQueenBonus(kings, queens);
  const matchTotalScore = matchPlayers.reduce((acc, player) => {
    return acc + player.totalScore;
  }, 0);

  return { matchPlayers, matchTotalScore };
};

export const saveMatch = async (players: Player[]) => {
  const { matchPlayers, matchTotalScore } = await calculateMatchScore(players);

  const match = await prisma.match.create({
    data: {
      totalScore: matchTotalScore,
      players: {
        create: matchPlayers.map((player) => ({
          name: player.name,
          appleCount: player.apple,
          breadCount: player.bread,
          cheeseCount: player.cheese,
          chickenCount: player.chicken,
          coins: player.coin,
          king: player.king,
          queen: player.queen,
          score: player.totalScore,
          contrabands: {
            create: player.contrabands?.map((contraband) => ({
              quantity: contraband.quantity,
              contraband: {
                connect: {
                  name: contraband.name,
                },
              },
            })),
          },
        })),
      },
    },
    include: {
      players: {
        include: {
          contrabands: {
            include: {
              contraband: true,
            },
          },
        },
      },
    },
  });

  const formattedMatch = mapMatchToResponse(match);
  return formattedMatch;
};

export const mapMatchToResponse = (match: MatchWithPlayers) => {
  const formattedPlayers = match.players.map((player) => ({
    ...player,
    appleScore: player.appleCount * GOODS_SCORES["apple"],
    breadScore: player.breadCount * GOODS_SCORES["bread"],
    cheeseScore: player.cheeseCount * GOODS_SCORES["cheese"],
    chickenScore: player.chickenCount * GOODS_SCORES["chicken"],
    contrabands: player.contrabands.map((c) => ({
      quantity: c.quantity,
      totalScore: c.quantity * c.contraband.score,
      ...c.contraband,
    })),
  }));
  const formattedMatch = { ...match, players: formattedPlayers };

  return formattedMatch;
};

export const calculateGoodsScore = async (players: Player[]) => {
  const contrabands = await prisma.contraband.findMany();
  const contrabandsMap = new Map(
    contrabands.map((contraband) => [contraband.name, contraband]),
  );

  const matchPlayers: PlayerScore[] = players.map((player) => {
    let totalScore = 0;
    totalScore += player.apple * GOODS_SCORES["apple"];
    totalScore += player.bread * GOODS_SCORES["bread"];
    totalScore += player.cheese * GOODS_SCORES["cheese"];
    totalScore += player.chicken * GOODS_SCORES["chicken"];
    totalScore += player.coin;
    if (player.contrabands) {
      totalScore += player.contrabands.reduce(
        (acc, curr) =>
          acc + curr.quantity * (contrabandsMap.get(curr.name)?.score || 0),
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

  kingsEntries.forEach(([resource, players]) => {
    let scoreBonus = 0;
    if (players.length > 1) {
      scoreBonus = Math.floor(
        (KINGS_BONUS[resource] + QUEENS_BONUS[resource]) /
          kings[resource].length,
      );
    } else if (players.length === 1) {
      scoreBonus = KINGS_BONUS[resource];
    }

    players.forEach((player) => {
      player.king.push(resource);
      player.totalScore += scoreBonus;
    });
  });

  queensEntries.forEach(([resource, players]) => {
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

export const getMatches = async () => {
  const matches = await prisma.match.findMany({
    include: {
      players: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return matches;
};

export const getMatch = async (id: string) => {
  const match = await prisma.match.findUnique({
    where: { id: parseInt(id) },
    include: {
      players: {
        include: {
          contrabands: {
            include: {
              contraband: true,
            },
            omit: {
              matchPlayerId: true,
              contrabandId: true,
            },
          },
        },
      },
    },
  });

  if (match) {
    return mapMatchToResponse(match);
  } else {
    throw new AppError("Match not found", 404);
  }
};
