import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  serial,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { articleCategories } from "../article/articleCategory";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  author: text("author").notNull(),
  thumbnail: text("thumbnail"),
  description: text("description").notNull(),
  bookComments: text("book_comments"),
  price: integer("price").notNull(),
  ISBN: text("ISBN").notNull().unique(),
  editionNo: integer("edition_no").notNull(),
  state: text("state").notNull(),
  pageCount: integer("page_count").notNull(),
  publishTime: timestamp("publish_time").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdBy: serial("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedBy: integer("modified_by"),
  modifiedAt: timestamp("modified_at").defaultNow(),
  categoryId: integer("category_id").references(
    (): AnyPgColumn => articleCategories.id
  ),
});

export const insertBookSchema = createInsertSchema(books);
