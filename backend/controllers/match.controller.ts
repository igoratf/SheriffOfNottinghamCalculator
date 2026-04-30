import { type NextFunction, type Request, type Response } from "express";
import * as matchService from "../services/match.service.js";

export const saveMatch = async (req: Request, res: Response) => {
  const matchScore = await matchService.saveMatch(req.body.players);
  res.json({ match: matchScore });
};

export const getMatches = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const matches = await matchService.getMatches(page);
  res.json({ matches: matches });
};

export const getMatch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const matchId = req.params.id ?? "";

  try {
    const match = await matchService.getMatch(matchId as string);
    return res.json({ match: match });
  } catch (err) {
    next(err);
  }
};
