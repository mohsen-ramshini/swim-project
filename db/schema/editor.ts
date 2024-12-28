import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const editors = pgTable("editors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertEditorsSchema = createInsertSchema(editors);
