import { defineConfig } from "prisma/config";
import { DATABASE_URL } from "./config/env.js";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    seed: "node ./prisma/seed.js",
  },
  datasource: {
    url: DATABASE_URL || "",
  },
});
