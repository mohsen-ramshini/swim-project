ALTER TABLE "news" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_slug_unique" UNIQUE("slug");