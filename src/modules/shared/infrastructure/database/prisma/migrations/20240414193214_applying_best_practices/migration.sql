/*
  Warnings:

  - The primary key for the `AnswerOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AnswerOption` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `AnswerOption` table. All the data in the column will be lost.
  - The primary key for the `AnswerOptionResponse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer_option_id` on the `AnswerOptionResponse` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AnswerOptionResponse` table. All the data in the column will be lost.
  - You are about to drop the column `question_response_id` on the `AnswerOptionResponse` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `is_read` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `survey_id` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `QuestionResponse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `QuestionResponse` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `QuestionResponse` table. All the data in the column will be lost.
  - You are about to drop the column `survey_participation_id` on the `QuestionResponse` table. All the data in the column will be lost.
  - The primary key for the `Survey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creator_id` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `ends_at` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `force_to_rate` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `invitations_qty` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `is_public` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `participants_rated_qty` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `participations_qty` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `starts_at` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `users_invitation_accepted_qty` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `users_invited_qty` on the `Survey` table. All the data in the column will be lost.
  - The primary key for the `SurveyInvitation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SurveyInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `survey_id` on the `SurveyInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `SurveyInvitation` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_online` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surveys_created_qty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surveys_invited_qty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surveys_participated_qty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surveys_rated_avg` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surveys_rated_qty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `SurveyParticipation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_participants_on_surveys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `FK_ID_QUESTION` to the `AnswerOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_ANSWER_OPTION` to the `AnswerOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_ANSWER_OPTION` to the `AnswerOptionResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_QUESTION_RESPONSE` to the `AnswerOptionResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_ANSWER_OPTION_RESPONSE` to the `AnswerOptionResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_USER` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_NOTIFICATION` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isRead` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_SURVEY` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_QUESTION` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_QUESTION` to the `QuestionResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_SURVEY_RESPONSE` to the `QuestionResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_QUESTION_RESPONSE` to the `QuestionResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_USER` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_SURVEY` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forceToRate` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `participationCondition` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `FK_ID_SURVEY` to the `SurveyInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_ID_USER` to the `SurveyInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_SURVEY_INVITATION` to the `SurveyInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_USER` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOnline` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParticipationCondition" AS ENUM ('ALL', 'GUEST_USERS', 'REGISTERED_USERS');

-- DropForeignKey
ALTER TABLE "AnswerOption" DROP CONSTRAINT "AnswerOption_question_id_fkey";

-- DropForeignKey
ALTER TABLE "AnswerOptionResponse" DROP CONSTRAINT "AnswerOptionResponse_answer_option_id_fkey";

-- DropForeignKey
ALTER TABLE "AnswerOptionResponse" DROP CONSTRAINT "AnswerOptionResponse_question_response_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_question_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_survey_participation_id_fkey";

-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "SurveyInvitation" DROP CONSTRAINT "SurveyInvitation_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "SurveyInvitation" DROP CONSTRAINT "SurveyInvitation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SurveyParticipation" DROP CONSTRAINT "SurveyParticipation_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "SurveyParticipation" DROP CONSTRAINT "SurveyParticipation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_participants_on_surveys" DROP CONSTRAINT "_participants_on_surveys_A_fkey";

-- DropForeignKey
ALTER TABLE "_participants_on_surveys" DROP CONSTRAINT "_participants_on_surveys_B_fkey";

-- AlterTable
ALTER TABLE "AnswerOption" DROP CONSTRAINT "AnswerOption_pkey",
DROP COLUMN "id",
DROP COLUMN "question_id",
ADD COLUMN     "FK_ID_QUESTION" TEXT NOT NULL,
ADD COLUMN     "ID_ANSWER_OPTION" TEXT NOT NULL,
ADD CONSTRAINT "AnswerOption_pkey" PRIMARY KEY ("ID_ANSWER_OPTION");

-- AlterTable
ALTER TABLE "AnswerOptionResponse" DROP CONSTRAINT "AnswerOptionResponse_pkey",
DROP COLUMN "answer_option_id",
DROP COLUMN "id",
DROP COLUMN "question_response_id",
ADD COLUMN     "FK_ID_ANSWER_OPTION" TEXT NOT NULL,
ADD COLUMN     "FK_ID_QUESTION_RESPONSE" TEXT NOT NULL,
ADD COLUMN     "ID_ANSWER_OPTION_RESPONSE" TEXT NOT NULL,
ADD CONSTRAINT "AnswerOptionResponse_pkey" PRIMARY KEY ("ID_ANSWER_OPTION_RESPONSE");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "id",
DROP COLUMN "is_read",
DROP COLUMN "user_id",
ADD COLUMN     "FK_ID_USER" TEXT NOT NULL,
ADD COLUMN     "ID_NOTIFICATION" TEXT NOT NULL,
ADD COLUMN     "isRead" BOOLEAN NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("ID_NOTIFICATION");

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "id",
DROP COLUMN "survey_id",
ADD COLUMN     "FK_ID_SURVEY" TEXT NOT NULL,
ADD COLUMN     "ID_QUESTION" TEXT NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("ID_QUESTION");

-- AlterTable
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_pkey",
DROP COLUMN "id",
DROP COLUMN "question_id",
DROP COLUMN "survey_participation_id",
ADD COLUMN     "FK_ID_QUESTION" TEXT NOT NULL,
ADD COLUMN     "FK_ID_SURVEY_RESPONSE" TEXT NOT NULL,
ADD COLUMN     "ID_QUESTION_RESPONSE" TEXT NOT NULL,
ADD CONSTRAINT "QuestionResponse_pkey" PRIMARY KEY ("ID_QUESTION_RESPONSE");

-- AlterTable
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_pkey",
DROP COLUMN "creator_id",
DROP COLUMN "ends_at",
DROP COLUMN "force_to_rate",
DROP COLUMN "id",
DROP COLUMN "invitations_qty",
DROP COLUMN "is_public",
DROP COLUMN "participants_rated_qty",
DROP COLUMN "participations_qty",
DROP COLUMN "starts_at",
DROP COLUMN "users_invitation_accepted_qty",
DROP COLUMN "users_invited_qty",
ADD COLUMN     "FK_ID_USER" TEXT NOT NULL,
ADD COLUMN     "ID_SURVEY" TEXT NOT NULL,
ADD COLUMN     "endsAt" TIMESTAMP(3),
ADD COLUMN     "forceToRate" BOOLEAN NOT NULL,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "participationCondition",
ADD COLUMN     "participationCondition" "ParticipationCondition" NOT NULL,
ADD CONSTRAINT "Survey_pkey" PRIMARY KEY ("ID_SURVEY");

-- AlterTable
ALTER TABLE "SurveyInvitation" DROP CONSTRAINT "SurveyInvitation_pkey",
DROP COLUMN "id",
DROP COLUMN "survey_id",
DROP COLUMN "user_id",
ADD COLUMN     "FK_ID_SURVEY" TEXT NOT NULL,
ADD COLUMN     "FK_ID_USER" TEXT NOT NULL,
ADD COLUMN     "ID_SURVEY_INVITATION" TEXT NOT NULL,
ADD CONSTRAINT "SurveyInvitation_pkey" PRIMARY KEY ("ID_SURVEY_INVITATION");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "is_online",
DROP COLUMN "surveys_created_qty",
DROP COLUMN "surveys_invited_qty",
DROP COLUMN "surveys_participated_qty",
DROP COLUMN "surveys_rated_avg",
DROP COLUMN "surveys_rated_qty",
ADD COLUMN     "ID_USER" TEXT NOT NULL,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("ID_USER");

-- DropTable
DROP TABLE "SurveyParticipation";

-- DropTable
DROP TABLE "_participants_on_surveys";

-- DropEnum
DROP TYPE "SurveyParticipationCondition";

-- CreateTable
CREATE TABLE "SurveyResponse" (
    "ID_SURVEY_RESPONSE" TEXT NOT NULL,
    "FK_ID_SURVEY" TEXT NOT NULL,
    "FK_ID_USER" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("ID_SURVEY_RESPONSE")
);

-- CreateTable
CREATE TABLE "_SurveyParticipant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SurveyParticipant_AB_unique" ON "_SurveyParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_SurveyParticipant_B_index" ON "_SurveyParticipant"("B");

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_FK_ID_USER_fkey" FOREIGN KEY ("FK_ID_USER") REFERENCES "User"("ID_USER") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyInvitation" ADD CONSTRAINT "SurveyInvitation_FK_ID_SURVEY_fkey" FOREIGN KEY ("FK_ID_SURVEY") REFERENCES "Survey"("ID_SURVEY") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyInvitation" ADD CONSTRAINT "SurveyInvitation_FK_ID_USER_fkey" FOREIGN KEY ("FK_ID_USER") REFERENCES "User"("ID_USER") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_FK_ID_SURVEY_fkey" FOREIGN KEY ("FK_ID_SURVEY") REFERENCES "Survey"("ID_SURVEY") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerOption" ADD CONSTRAINT "AnswerOption_FK_ID_QUESTION_fkey" FOREIGN KEY ("FK_ID_QUESTION") REFERENCES "Question"("ID_QUESTION") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_FK_ID_SURVEY_fkey" FOREIGN KEY ("FK_ID_SURVEY") REFERENCES "Survey"("ID_SURVEY") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_FK_ID_USER_fkey" FOREIGN KEY ("FK_ID_USER") REFERENCES "User"("ID_USER") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_FK_ID_SURVEY_RESPONSE_fkey" FOREIGN KEY ("FK_ID_SURVEY_RESPONSE") REFERENCES "SurveyResponse"("ID_SURVEY_RESPONSE") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_FK_ID_QUESTION_fkey" FOREIGN KEY ("FK_ID_QUESTION") REFERENCES "Question"("ID_QUESTION") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerOptionResponse" ADD CONSTRAINT "AnswerOptionResponse_FK_ID_QUESTION_RESPONSE_fkey" FOREIGN KEY ("FK_ID_QUESTION_RESPONSE") REFERENCES "QuestionResponse"("ID_QUESTION_RESPONSE") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerOptionResponse" ADD CONSTRAINT "AnswerOptionResponse_FK_ID_ANSWER_OPTION_fkey" FOREIGN KEY ("FK_ID_ANSWER_OPTION") REFERENCES "AnswerOption"("ID_ANSWER_OPTION") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_FK_ID_USER_fkey" FOREIGN KEY ("FK_ID_USER") REFERENCES "User"("ID_USER") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SurveyParticipant" ADD CONSTRAINT "_SurveyParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Survey"("ID_SURVEY") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SurveyParticipant" ADD CONSTRAINT "_SurveyParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("ID_USER") ON DELETE CASCADE ON UPDATE CASCADE;
