import { defineConfig } from "drizzle-kit";
import 'dotenv/config'
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!
  }
});