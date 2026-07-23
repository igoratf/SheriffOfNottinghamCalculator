import { prisma } from "../prisma/client.js";

export const getContrabands = async () => {
  const contrabands = await prisma.contraband.findMany();

  return contrabands;
};
