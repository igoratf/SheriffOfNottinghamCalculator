import { type NextFunction, type Request, type Response } from "express";
import * as matchService from "../services/match.service.js";
import { MatchSort } from "../constants.js";
import { parseMatchSort } from "../utils/utils.js";

export const saveMatch = async (req: Request, res: Response) => {
  const matchScore = await matchService.saveMatch(req.body.players);
  res.json({ match: matchScore });
};

export const getMatches = async (req: Request, res: Response) => {
  console.log(" request", req.query);
  const page = req.query.page ? parseInt(req.query.page as string) : 1;

  const sort = parseMatchSort(req.query.sort) ?? MatchSort.DESC;
  const player =
    typeof req.query.player === "string" ? req.query.player : undefined;
  const dateFrom =
    typeof req.query.dateFrom === "string" ? req.query.dateFrom : undefined;
  const dateTo =
    typeof req.query.dateTo === "string" ? req.query.dateTo : undefined;

  console.log("req ", req.query.dateFrom);

  const matches = await matchService.getMatches(
    page,
    sort,
    player,
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
