import { Router } from "express";
import { getSpecialOrders } from "../controllers/specialOrder.controller.js";

export const specialOrderRouter = Router();

specialOrderRouter.get("/", getSpecialOrders);
