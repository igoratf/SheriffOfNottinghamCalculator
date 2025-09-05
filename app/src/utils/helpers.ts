import {
  KINGS_AND_QUEENS_BONUS,
  RESOURCE_NAMES,
  RESOURCE_SCORE_MAP,
} from "./constants";
import {
  type Player,
  type PlayerScore,
  type KingsAndQueens,
  type KingQueenResourceName,
} from "./types.d";

export function capitalizeFirstLetter(resource: string) {
  return resource.charAt(0).toUpperCase() + resource.slice(1);
}

// Helper function to get effective resource quantities for king/queen calculations
// This includes contraband resource bonuses
function getEffectiveResourceQuantities(
  player: Player
): Record<KingQueenResourceName, number> {
  const effectiveQuantities: Record<KingQueenResourceName, number> = {
    apple: player.apple,
    bread: player.bread,
    cheese: player.cheese,
    chicken: player.chicken,
  };

  // Add contraband resource bonuses to effective quantities
  if (player.contrabands) {
    player.contrabands.forEach((playerContraband) => {
      const { contraband, quantity } = playerContraband;

      if (contraband.resourceBonus && contraband.resourceType) {
        const resourceType = contraband.resourceType as KingQueenResourceName;
        if (resourceType in effectiveQuantities) {
          effectiveQuantities[resourceType] +=
            contraband.resourceBonus * quantity;
        }
      }
    });
  }

  return effectiveQuantities;
}

export function calculatePlayerScore(player: Player): PlayerScore {
  const totalResourceScore: PlayerScore = {
    apple: player.apple * RESOURCE_SCORE_MAP.apple,
    bread: player.bread * RESOURCE_SCORE_MAP.bread,
    cheese: player.cheese * RESOURCE_SCORE_MAP.cheese,
    chicken: player.chicken * RESOURCE_SCORE_MAP.chicken,
    coin: player.coin * RESOURCE_SCORE_MAP.coin,
    contraband: player.contraband * RESOURCE_SCORE_MAP.contraband,
    total: 0,
  };

  // Add detailed contraband scores (only base contraband score, not resource bonuses)
  if (player.contrabands) {
    player.contrabands.forEach((playerContraband) => {
      const { contraband, quantity } = playerContraband;

      // Add base contraband score only
      totalResourceScore.contraband += contraband.score * quantity;
    });
  }

  totalResourceScore.total = Object.values(totalResourceScore).reduce(
    (acc, score) => acc + score,
    0
  );

  return totalResourceScore;
}

export function calculateScore(players: Player[]): Record<string, PlayerScore> {
  const playerScoreMap: Record<string, PlayerScore> = players.reduce(
    (acc, player) => {
      const score = calculatePlayerScore(player);
      return { ...acc, [player.name]: score };
    },
    {}
  );

  const { kings, queens } = calculateKingsAndQueens(players);

  RESOURCE_NAMES.forEach((resource) => {
    const resourceKings = kings[resource as KingQueenResourceName];
    const resourceQueens = queens[resource as KingQueenResourceName];

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
          (player: Player) =>
            (playerScoreMap[player.name]["total"] += totalBonus)
        );
      }
      // If there are multiple kings, the king and queen bonus are added and split between them. There's no payout for queens
    } else {
      const totalBonus = Math.floor(
        (kingBonus + queenBonus) / resourceKings.length
      );
      resourceKings.forEach(
        (player: Player) => (playerScoreMap[player.name]["total"] += totalBonus)
      );
    }
  });

  return playerScoreMap;
}

export function calculateKingsAndQueens(players: Player[]): KingsAndQueens {
  const kings: Record<KingQueenResourceName, Player[]> = {
    apple: [],
    bread: [],
    cheese: [],
    chicken: [],
  };

  const queens: Record<KingQueenResourceName, Player[]> = {
    apple: [],
    bread: [],
    cheese: [],
    chicken: [],
  };

  const kingQueenResources: KingQueenResourceName[] = [
    "apple",
    "bread",
    "cheese",
    "chicken",
  ];

  players.forEach((player) => {
    kingQueenResources.forEach((resource) => {
      compareResourceScore(kings, queens, resource, player);
    });
  });

  return { kings, queens };
}

function compareResourceScore(
  kingsMap: Record<KingQueenResourceName, Player[]>,
  queensMap: Record<KingQueenResourceName, Player[]>,
  resource: KingQueenResourceName,
  player: Player
) {
  const resourceKings = kingsMap[resource];
  const resourceQueens = queensMap[resource];

  const currentKing = resourceKings[0];
  const currentQueen = resourceQueens[0];

  // Use effective resource quantities (including contraband bonuses) for king/queen calculations
  const effectiveQuantities = getEffectiveResourceQuantities(player);
  const playerResource = effectiveQuantities[resource];

  // If there's no king, the player becomes king
  if (!currentKing) {
    return (kingsMap[resource] = [player]);
  }

  // Get effective quantities for current king
  const currentKingEffectiveQuantities =
    getEffectiveResourceQuantities(currentKing);
  const currentKingResource = currentKingEffectiveQuantities[resource];

  /* If the player has more goods than the current king, it becomes king
   and previous king becomes queen */
  if (playerResource > currentKingResource) {
    kingsMap[resource] = [player];
    queensMap[resource] = [currentKing];

    /* If player has the same amount as the king, it's a tie and there is no queen */
  } else if (playerResource === currentKingResource) {
    kingsMap[resource].push(player);
    queensMap[resource] = [];
  } else if (resourceQueens.length === 0) {
    return (queensMap[resource] = [player]);
  } else {
    // Get effective quantities for current queen
    const currentQueenEffectiveQuantities =
      getEffectiveResourceQuantities(currentQueen);
    const currentQueenResource = currentQueenEffectiveQuantities[resource];

    if (playerResource > currentQueenResource) {
      queensMap[resource] = [player];
    } else if (playerResource === currentQueenResource) {
      queensMap[resource].push(player);
    }
  }
}
