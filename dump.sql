CREATE TABLE users (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"picture_url" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);



CREATE TABLE sessions (
	"id" serial NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"user_id" integer NOT NULL,
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);



CREATE TABLE posts (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"link_id" integer NOT NULL,
	"description" TEXT NOT NULL,
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
);



CREATE TABLE links (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"url" TEXT NOT NULL,
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
);



CREATE TABLE hastags (
	"id" serial NOT NULL,
	"name" serial NOT NULL,
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	CONSTRAINT "hastags_pk" PRIMARY KEY ("id")
);



CREATE TABLE post_hastags (
	"id" serial NOT NULL,
	"hastag_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	CONSTRAINT "post_hastags_pk" PRIMARY KEY ("id")
);



CREATE TABLE likes (
	"id" serial NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("link_id") REFERENCES "links"("id");

ALTER TABLE "links" ADD CONSTRAINT "links_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "post_hastags" ADD CONSTRAINT "post_hastags_fk0" FOREIGN KEY ("hastag_id") REFERENCES "hastags"("id");
ALTER TABLE "post_hastags" ADD CONSTRAINT "post_hastags_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");