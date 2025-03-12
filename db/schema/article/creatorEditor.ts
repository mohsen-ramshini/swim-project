import { pgTable, integer } from "drizzle-orm/pg-core";
import { creators } from "./creator";
import { editors } from "./editor";
import { createInsertSchema } from "drizzle-zod";

export const creatorEditor = pgTable("creator_editor", {
  creator_id: integer("creator_id")
    .notNull()
    .references(() => creators.id),
  editor_id: integer("editor_id")
    .notNull()
    .references(() => editors.id),
});

export const insertCreatorEditorSchema = createInsertSchema(creatorEditor);
