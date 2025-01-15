import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  serial,
  uuid,
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
  // publishTime: timestamp("publish_time").notNull(),
  // isActive: boolean("is_active").default(true).notNull(),
  createdBy: serial("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedBy: integer("modified_by"),
  modifiedAt: timestamp("modified_at").defaultNow(),
});

export const insertArticleSchema = createInsertSchema(articles);

// import {
//   pgTable,
//   text,
//   serial,
//   boolean,
//   integer,
//   timestamp,
//   uuid,
// } from "drizzle-orm/pg-core";
// import { articleCategories } from "./articleCategory";
// import { createInsertSchema } from "drizzle-zod";

// export const articles = pgTable("articles", {
//   id: uuid("id").primaryKey(),
//   articleType: integer("article_type").notNull().default(1),
//   title: text("title").notNull(),
//   slug: text("slug").notNull().unique(),
//   thumbnail: text("thumbnail"), // Updated to allow null values
//   excerpt: text("excerpt").notNull(),
//   content: text("content").notNull(),
//   categoryId: integer("category_id")
//     .references(() => articleCategories.id)
//     .notNull(),
//   reference: text("reference"), // Updated to allow null values
//   publishTime: timestamp("publish_time").notNull(),
//   isActive: boolean("is_active").default(true).notNull(),
//   createdBy: uuid("created_by").notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   modifiedBy: integer("modified_by"), // Updated to allow null values
//   modifiedAt: timestamp("modified_at").defaultNow(), // Updated to allow null values
// });

// export const insertArticleSchema = createInsertSchema(articles);
