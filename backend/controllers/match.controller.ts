import { type NextFunction, type Request, type Response } from "express";
import * as matchService from "../services/match.service.js";
import type { SortOption } from "../services/types.js";

export const saveMatch = async (req: Request, res: Response) => {
  const matchScore = await matchService.saveMatch(req.body.players);
  res.status(201).json({ match: matchScore });
};

export const getMatches = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;

  const sortBy =
    typeof req.query.sortBy === "string" ? req.query.sortBy : undefined;
  const players =
    typeof req.query.players === "string" ? req.query.players : undefined;
  const dateFrom =
    typeof req.query.dateFrom === "string" ? req.query.dateFrom : undefined;
  const dateTo =
    typeof req.query.dateTo === "string" ? req.query.dateTo : undefined;

  const matches = await matchService.getMatches(
    page,
    // TODO: Fix this with util function
    sortBy as SortOption,
    players,
    dateFrom,
    dateTo,
  );
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
