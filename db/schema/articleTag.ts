import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const articleTags = pgTable("article_tags", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertArticleTagSchema = createInsertSchema(articleTags);
