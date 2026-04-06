import { Router } from "express";
import {
  saveMatch,
  getMatches,
  getMatch,
} from "../controllers/match.controller.js";

export const matchRouter = Router();

matchRouter.get("/", getMatches);
matchRouter.get("/:id", getMatch);
matchRouter.post("/save", saveMatch);
