import { Router } from "express";
import { saveMatch } from "../controllers/match.controller.js";

export const matchRouter = Router();

matchRouter.post("/save", saveMatch);
