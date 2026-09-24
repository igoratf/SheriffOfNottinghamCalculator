import { prisma } from "../prisma/client.js";

export const getSpecialOrders = async () => {
  const specialOrders = await prisma.specialOrder.findMany();

  return specialOrders;
};
