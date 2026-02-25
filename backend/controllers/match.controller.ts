import { type Request, type Response } from "express";
import type { KingQueenResourceName, Player } from "../types.js";

export const saveMatch = (req: Request, res: Response) => {
  calculateKingsAndQueens(req.body.players);
  res.json({ data: "This is a test" });
};

export const calculateKingsAndQueens = (players: Player[]) => {
  return players.forEach((player) => calculateContrabandBonus(player));
};

const calculateContrabandBonus = (player: Player) => {
  const playerContrabands = player.contrabands;
  console.log("PREVIOUS ", player);
  playerContrabands.map((playerContraband) => {
    const { resourceType, resourceBonus } = playerContraband;
    if (resourceType && resourceBonus && resourceType in player) {
      player[resourceType as KingQueenResourceName] +=
        resourceBonus * playerContraband.quantity;
    }
  });
  console.log("AFTER BONUS ", player);
};
