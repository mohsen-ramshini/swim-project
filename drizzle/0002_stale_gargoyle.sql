CREATE TABLE "article_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "article_tags_slug_unique" UNIQUE("slug")
);
