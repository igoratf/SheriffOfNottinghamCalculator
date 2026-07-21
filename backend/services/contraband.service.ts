import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

export const getContrabands = async () => {
  const contrabands = await prisma.contraband.findMany();

  return contrabands;
};
