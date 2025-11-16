import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// -------------------- COURSES TABLE --------------------

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),

  image_url: text("image_url").notNull(),
  banner_url: text("banner_url"),

  // category, instructor, organizer → همه آبجکت هستند
  category: jsonb("category").notNull(),
  instructor: jsonb("instructor").notNull(),
  organizer: jsonb("organizer").notNull(),

  duration: integer("duration").notNull(),
  capacity: integer("capacity").notNull(),
  remaining_capacity: integer("remaining_capacity").notNull(),
  session_counts: integer("session_counts").notNull(),

  start_date: text("start_date").notNull(), // یا timestamp اگر تاریخ واقعی ذخیره می‌کنی

  price: integer("price").notNull(),

  offers: text("offers"),

  has_replay: boolean("has_replay").notNull().default(false),
  is_elected: boolean("is_elected").notNull().default(false),

  election_order: integer("election_order").notNull().default(-1),
});

export const insertCourseSchema = createInsertSchema(courses);
export type CourseType = InferSelectModel<typeof courses>;
export type InsertCourseType = InferInsertModel<typeof courses>;