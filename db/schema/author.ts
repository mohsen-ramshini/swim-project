import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertAuthorSchema = createInsertSchema(authors);
