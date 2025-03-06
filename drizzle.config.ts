import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema/**/*.ts", // 👈 این تغییر باعث می‌شه همه فایل‌های TS داخل db/schema پیدا بشن
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
