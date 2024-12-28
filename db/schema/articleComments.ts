import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { articles } from "./article";
import { createInsertSchema } from "drizzle-zod";

export const articleComments = pgTable("article_comments", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id")
    .references(() => articles.id)
    .notNull(),
  parentId: integer("parent_id"),
  userId: integer("user_id").notNull(), // Foreign key to users table
  createDate: timestamp("create_date").defaultNow().notNull(),
  text: text("text").notNull(),
});

export const insertArticleCommentsSchema = createInsertSchema(articleComments);
