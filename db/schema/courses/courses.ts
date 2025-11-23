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

export type CategoryType = {
  slug: string;
  title: string;
};

export type InstructorType = {
  slug: string;
  title: string;
};

export type OrganizerType = {
  slug: string;
  title: string;
  order: number;
};

export type CourseType = {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  banner_url: string | null;

  category: CategoryType;
  instructor: InstructorType;
  organizer: OrganizerType;

  duration: number;
  capacity: number;
  remaining_capacity: number;
  session_counts: number;

  start_date: string;
  price: number;
  offers: string | null;
  has_replay: boolean;
  is_elected: boolean;
  election_order: number;
};


// -------------------- COURSES TABLE --------------------

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),

  image_url: text("image_url").notNull(),
  banner_url: text("banner_url"),

  category: jsonb("category").$type<CategoryType>().notNull(),
  instructor: jsonb("instructor").$type<InstructorType>().notNull(),
  organizer: jsonb("organizer").$type<OrganizerType>().notNull(),

  duration: integer("duration").notNull(),
  capacity: integer("capacity").notNull(),
  remaining_capacity: integer("remaining_capacity").notNull(),
  session_counts: integer("session_counts").notNull(),

  start_date: text("start_date").notNull(),
  price: integer("price").notNull(),

  offers: text("offers"),

  has_replay: boolean("has_replay").notNull().default(false),
  is_elected: boolean("is_elected").notNull().default(false),

  election_order: integer("election_order").notNull().default(-1),
});


export const insertCourseSchema = createInsertSchema(courses);
// export type CourseType = InferSelectModel<typeof courses>;
export type InsertCourseType = InferInsertModel<typeof courses>;