import { Prisma } from "@prisma/client";
import type { SORT_OPTIONS } from "../utils/constants.js";

export type MatchWithPlayers = Prisma.MatchGetPayload<{
  include: {
    players: {
      include: {
        contrabands: {
          include: {
            contraband: true;
          };
        };
      };
    };
  };
}>;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
