CREATE TABLE "creator_author" (
	"creator_id" integer NOT NULL,
	"author_id" integer NOT NULL
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
ALTER TABLE "creator_author" ADD CONSTRAINT "creator_author_creator_id_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creator_author" ADD CONSTRAINT "creator_author_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_comments" ADD CONSTRAINT "book_comments_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;