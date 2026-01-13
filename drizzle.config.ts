import { defineConfig } from "drizzle-kit";
import { env } from "./src/data/env/server";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  strict: true,
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
 
  },
});
