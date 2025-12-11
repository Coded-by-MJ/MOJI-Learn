import { defineConfig } from "drizzle-kit";
import { env } from "./src/data/env/server";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  strict: true,
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    ssl: false,
  },
});
