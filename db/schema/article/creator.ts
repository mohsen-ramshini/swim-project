import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const creators = pgTable("creators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  translator: boolean("translator").default(false).notNull(),
  editor: boolean("editor").default(false).notNull(),
  author: boolean("author").default(false).notNull(),
});

export const insertCreatorSchema = createInsertSchema(creators);
