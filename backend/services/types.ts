import { Prisma } from "@prisma/client";

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
