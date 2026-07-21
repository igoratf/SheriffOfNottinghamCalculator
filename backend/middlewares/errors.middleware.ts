import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof AppError) {
    console.error(err);
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  console.error("Unhandled server error ", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong on the server.",
  });
};
