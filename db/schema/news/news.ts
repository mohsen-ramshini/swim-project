import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  banner: text("banner"),
  publishDate: timestamp("publish_date").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdBy: serial("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedBy: integer("modified_by"),
  modifiedAt: timestamp("modified_at").defaultNow(),
});

export const insertNewsSchema = createInsertSchema(news);
