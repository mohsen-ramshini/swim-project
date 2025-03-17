ALTER TABLE "creators" ADD COLUMN "translator" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "creators" ADD COLUMN "editor" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "creators" ADD COLUMN "author" boolean DEFAULT false NOT NULL;