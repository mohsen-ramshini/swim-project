import { pgTable, integer } from "drizzle-orm/pg-core";
import { creators } from "./creator";
import { authors } from "./author";
import { createInsertSchema } from "drizzle-zod";

export const creatorAuthor = pgTable("creator_author", {
  creator_id: integer("creator_id")
    .notNull()
    .references(() => creators.id),
  author_id: integer("author_id")
    .notNull()
    .references(() => authors.id),
});

export const insertCreatorAuthorSchema = createInsertSchema(creatorAuthor);
