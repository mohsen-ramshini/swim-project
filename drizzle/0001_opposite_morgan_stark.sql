CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_type" integer DEFAULT 1 NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"thumbnail" text,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"category_id" integer NOT NULL,
	"reference" text,
	"publish_time" timestamp NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_by" integer,
	"modified_at" timestamp DEFAULT now(),
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "article_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" integer NOT NULL,
	"parent_id" integer,
	"user_id" integer NOT NULL,
	"create_date" timestamp DEFAULT now() NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_article_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."article_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_comments" ADD CONSTRAINT "article_comments_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE no action ON UPDATE no action;