import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { articleCategories } from "./articleCategory";
import { createInsertSchema } from "drizzle-zod";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  articleType: integer("article_type").notNull().default(1),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  thumbnail: text("thumbnail"),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  categoryId: integer("category_id")
    .references(() => articleCategories.id)
    .notNull(),
  reference: text("reference"),
  publishTime: timestamp("publish_time").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdBy: serial("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedBy: integer("modified_by"),
  modifiedAt: timestamp("modified_at").defaultNow(),
  authorId: integer("author_id"),
  editorId: integer("editor_id"),
  translatorId: integer("translator_id"),
});

export const insertArticleSchema = createInsertSchema(articles);
