import { type Request, type Response } from "express";
import * as matchService from "../services/match.service.js";

export const saveMatch = (req: Request, res: Response) => {
  const matchScore = matchService.calculateMatchScore(req.body.players);
  res.json({ data: matchScore });
};
