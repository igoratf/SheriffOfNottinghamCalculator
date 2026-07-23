import type { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client.js";

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const WINDOW_SIZE_IN_MINUTES = 15 * 60 * 1000; // 15 minutes
  const WINDOW_REQUEST_LIMIT = 100;

  const key = req.ip ?? "";

  const rateLimit = await prisma.rateLimiter.findUnique({
    where: {
      id: key,
    },
  });

  // If there's no rate limit for the IP, it's the first request
  if (!rateLimit) {
    await prisma.rateLimiter.create({
      data: {
        id: key,
        requests: 1,
        windowStart: new Date(),
      },
    });
    return next();
  }

  const currentTime = new Date().getTime();
  const timeDifference = currentTime - rateLimit.windowStart.getTime();

  // If window expired, reset the count and window start time
  if (timeDifference > WINDOW_SIZE_IN_MINUTES) {
    await prisma.rateLimiter.update({
      where: {
        id: key,
      },
      data: {
        requests: 1,
        windowStart: new Date(),
      },
    });
    return next();
  }

  if (rateLimit.requests >= WINDOW_REQUEST_LIMIT) {
    return res
      .status(420)
      .json({ message: "Too many requests. Please try again later." });
  }

  // Increment the request count
  await prisma.rateLimiter.update({
    where: {
      id: key,
    },
    data: {
      requests: {
        increment: 1,
      },
    },
  });

  next();
}
