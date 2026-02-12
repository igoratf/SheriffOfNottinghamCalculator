import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.listen(5200, () => {
  console.log(`App running on port ${PORT}`);
});
