import { type Request, type Response } from "express";
import * as matchService from "../services/match.service.js";

export const saveMatch = async (req: Request, res: Response) => {
  const matchScore = await matchService.saveMatch(req.body.players);
  res.json({ data: matchScore });
};

export const getMatches = async (_req: Request, res: Response) => {
  const matches = await matchService.getMatches();
  res.json({ data: matches });
};

export const getMatch = async (req: Request, res: Response) => {
  console.log("req params id ", req.params.id);
  const matchId = req.params.id ?? "";
  const match = await matchService.getMatch(matchId as string);
  res.json({ data: match });
};
