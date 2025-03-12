import { pgTable, integer } from "drizzle-orm/pg-core";
import { creators } from "./creator";
import { translators } from "./translator";
import { createInsertSchema } from "drizzle-zod";

export const creatorTranslator = pgTable("creator_translator", {
  creator_id: integer("creator_id")
    .notNull()
    .references(() => creators.id),
  translator_id: integer("translator_id")
    .notNull()
    .references(() => translators.id),
});

export const insertCreatorTranslatorSchema =
  createInsertSchema(creatorTranslator);
