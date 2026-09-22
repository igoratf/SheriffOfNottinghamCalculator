import { type Request, type Response } from "express";
import * as specialOrderService from "../services/specialOrder.service.js";

export const getSpecialOrders = async (_req: Request, res: Response) => {
  const specialOrders = await specialOrderService.getSpecialOrders();

  res.json({ specialOrders });
};
