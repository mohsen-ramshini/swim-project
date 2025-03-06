import {
  pgTable,
  text,
  serial,
  boolean,
  integer,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const articleCategories = pgTable("article_categories", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id").references(
    (): AnyPgColumn => articleCategories.id
  ),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertArticleCategoriesSchema =
  createInsertSchema(articleCategories);
