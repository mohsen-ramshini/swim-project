CREATE TABLE "creators" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "creator_editor" (
	"creator_id" integer NOT NULL,
	"editor_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "creator_translator" (
	"creator_id" integer NOT NULL,
	"translator_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "creator_editor" ADD CONSTRAINT "creator_editor_creator_id_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creator_editor" ADD CONSTRAINT "creator_editor_editor_id_editors_id_fk" FOREIGN KEY ("editor_id") REFERENCES "public"."editors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creator_translator" ADD CONSTRAINT "creator_translator_creator_id_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creator_translator" ADD CONSTRAINT "creator_translator_translator_id_translators_id_fk" FOREIGN KEY ("translator_id") REFERENCES "public"."translators"("id") ON DELETE no action ON UPDATE no action;