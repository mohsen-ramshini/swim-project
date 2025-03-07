CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"content" text NOT NULL,
	"banner" text,
	"publish_date" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_by" integer,
	"modified_at" timestamp DEFAULT now()
);
