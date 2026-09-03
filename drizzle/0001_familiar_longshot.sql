ALTER TABLE "users" ALTER COLUMN "plan" SET DEFAULT 'basico';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "has_projetos_pacote" boolean DEFAULT false NOT NULL;