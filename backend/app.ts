import express from "express";
import { PORT } from "./config/env.js";
import { matchRouter } from "./routes/match.routes.js";
import { errorMiddleware } from "./middlewares/errors.middleware.js";

const app = express();

app.use(express.json());
app.use("/v1/match", matchRouter);

app.get("/", (req, res) => {
  console.log("works");
  res.send("API is running");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
