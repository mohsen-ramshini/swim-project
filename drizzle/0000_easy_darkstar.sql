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
	"publish_time" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_by" integer,
	"modified_at" timestamp DEFAULT now(),
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "article_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "article_categories_slug_unique" UNIQUE("slug")
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
CREATE TABLE "article_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "article_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "creators" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"author" text NOT NULL,
	"thumbnail" text,
	"description" text NOT NULL,
	"book_comments" text,
	"price" integer NOT NULL,
	"ISBN" text NOT NULL,
	"edition_no" integer NOT NULL,
	"state" text NOT NULL,
	"page_count" integer NOT NULL,
	"publish_time" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_by" integer,
	"modified_at" timestamp DEFAULT now(),
	CONSTRAINT "books_slug_unique" UNIQUE("slug"),
	CONSTRAINT "books_ISBN_unique" UNIQUE("ISBN")
);
--> statement-breakpoint
CREATE TABLE "book_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"parent_id" integer,
	"user_id" integer NOT NULL,
	"create_date" timestamp DEFAULT now() NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"slug" text NOT NULL,
	"content" text NOT NULL,
	"banner" text,
	"publish_date" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_by" integer,
	"modified_at" timestamp DEFAULT now(),
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_article_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."article_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_categories" ADD CONSTRAINT "article_categories_parent_id_article_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."article_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_comments" ADD CONSTRAINT "article_comments_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_comments" ADD CONSTRAINT "book_comments_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;