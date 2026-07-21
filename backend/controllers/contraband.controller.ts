import { type Request, type Response } from "express";
import * as contrabandService from "../services/contraband.service.js";

export const getContrabands = async (_req: Request, res: Response) => {
  const contrabands = await contrabandService.getContrabands();
  res.json({ contrabands: contrabands });
};
