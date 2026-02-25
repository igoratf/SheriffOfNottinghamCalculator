import { type Request, type Response } from "express";

export const saveMatch = (req: Request, res: Response) => {
  console.log("req ", req.body);
  res.json({ data: "This is a test" });
};
