import { Router } from "express";
import { getContrabands } from "../controllers/contraband.controller.js";

export const contrabandRouter = Router();

contrabandRouter.get("/", getContrabands);
