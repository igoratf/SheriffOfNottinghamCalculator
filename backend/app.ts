import express from "express";
import { PORT } from "./config/env.js";
import { matchRouter } from "./routes/match.routes.js";
import { errorMiddleware } from "./middlewares/errors.middleware.js";
import cors from "cors";
import { contrabandRouter } from "./routes/contraband.routes.js";
import { rateLimiter } from "./middlewares/rateLimiter.middleware.js";
import { specialOrderRouter } from "./routes/specialOrder.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use("/v1/match", matchRouter);
app.use("/v1/contraband", contrabandRouter);
app.use("/v1/special-order", specialOrderRouter);

app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
