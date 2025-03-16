import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { books } from "./book";
import { createInsertSchema } from "drizzle-zod";

export const bookComments = pgTable("book_comments", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .references(() => books.id)
    .notNull(),
  parentId: integer("parent_id"),
  userId: integer("user_id").notNull(),
  createDate: timestamp("create_date").defaultNow().notNull(),
  text: text("text").notNull(),
});

export const insertBookCommentsSchema = createInsertSchema(bookComments);
