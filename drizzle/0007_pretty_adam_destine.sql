ALTER TABLE "books" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "books" CASCADE;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "publish_time" SET DEFAULT now();