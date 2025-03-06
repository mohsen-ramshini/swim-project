import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const translators = pgTable("translators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertTranslatorSchema = createInsertSchema(translators);
