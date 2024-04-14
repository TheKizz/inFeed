CREATE TYPE "participation_conditions" AS ENUM (
  'all',
  'guest_user',
  'registered_user'
);

CREATE TYPE "question_types" AS ENUM (
  'selection',
  'multi_selection',
  'free_text'
);

CREATE TYPE "invitation_statuses" AS ENUM (
  'pending',
  'accepted',
  'rejected'
);

CREATE TYPE "participation_types" AS ENUM (
  'itself',
  'invitation'
);

CREATE TYPE "notification_origins" AS ENUM (
  'survey',
  'survey_participation',
  'survey_invitation'
);

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY NOT NULL,
  "username" varchar UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "surveys_created_qty" integer NOT NULL DEFAULT 0,
  "surveys_participations_qty" integer NOT NULL DEFAULT 0
);

CREATE TABLE "survey" (
  "id" uuid PRIMARY KEY NOT NULL,
  "title" varchar NOT NULL,
  "description" text NOT NULL,
  "participation_condition" participation_conditions DEFAULT 'all',
  "participations_qty" integer NOT NULL DEFAULT 0,
  "questions_qty" integer NOT NULL DEFAULT 0,
  "invitations_qty" integer NOT NULL DEFAULT 0,
  "force_to_rate" bool NOT NULL DEFAULT false,
  "score" float NOT NULL DEFAULT 0
);

CREATE TABLE "question" (
  "id" uuid PRIMARY KEY NOT NULL,
  "description" text NOT NULL,
  "survey_id" uuid NOT NULL,
  "question_type" question_types DEFAULT 'selection'
);

CREATE TABLE "question_option" (
  "id" uuid PRIMARY KEY NOT NULL,
  "text" varchar NOT NULL,
  "question_id" uuid NOT NULL
);

CREATE TABLE "survey_invitation" (
  "guest_id" uuid NOT NULL,
  "survey_id" uuid NOT NULL,
  "status" invitation_statuses NOT NULL DEFAULT 'pending',
  PRIMARY KEY ("guest_id", "survey_id")
);

CREATE TABLE "survey_participation" (
  "id" uuid PRIMARY KEY NOT NULL,
  "participant_id" uuid NOT NULL,
  "survey_id" uuid NOT NULL,
  "type" participation_types NOT NULL DEFAULT 'itself',
  "participant_given_score" integer
);

CREATE TABLE "question_response" (
  "id" uuid PRIMARY KEY NOT NULL,
  "survey_participation_id" uuid NOT NULL,
  "question_id" uuid NOT NULL
);

CREATE TABLE "option_response" (
  "id" uuid PRIMARY KEY NOT NULL,
  "question_response_id" uuid NOT NULL,
  "selected_option_id" uuid,
  "free_answer" varchar
);

CREATE TABLE "notification" (
  "id" uuid PRIMARY KEY NOT NULL,
  "description" varchar NOT NULL,
  "origin" notification_origins NOT NULL,
  "creation_date" datetime NOT NULL,
  "interested_id" uuid NOT NULL
);

CREATE UNIQUE INDEX ON "survey_participation" ("participant_id", "survey_id");

CREATE UNIQUE INDEX ON "question_response" ("survey_participation_id", "question_id");

COMMENT ON COLUMN "survey_participation"."participant_given_score" IS '1 to 5, depend of survey.force_to_rate';

COMMENT ON COLUMN "notification"."origin" IS 'Origin are all entities that are interesting for the user';

ALTER TABLE "question" ADD FOREIGN KEY ("survey_id") REFERENCES "survey" ("id");

ALTER TABLE "question_option" ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");

ALTER TABLE "survey_invitation" ADD FOREIGN KEY ("guest_id") REFERENCES "user" ("id");

ALTER TABLE "survey_invitation" ADD FOREIGN KEY ("survey_id") REFERENCES "survey" ("id");

ALTER TABLE "survey_participation" ADD FOREIGN KEY ("participant_id") REFERENCES "user" ("id");

ALTER TABLE "survey_participation" ADD FOREIGN KEY ("survey_id") REFERENCES "survey" ("id");

ALTER TABLE "question_response" ADD FOREIGN KEY ("survey_participation_id") REFERENCES "survey_participation" ("id");

ALTER TABLE "question_response" ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");

ALTER TABLE "option_response" ADD FOREIGN KEY ("question_response_id") REFERENCES "question_response" ("id");

ALTER TABLE "option_response" ADD FOREIGN KEY ("selected_option_id") REFERENCES "question_option" ("id");

ALTER TABLE "notification" ADD FOREIGN KEY ("interested_id") REFERENCES "user" ("id");
