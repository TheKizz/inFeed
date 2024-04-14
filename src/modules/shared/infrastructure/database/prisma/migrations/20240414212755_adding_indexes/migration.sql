/*
  Warnings:

  - You are about to drop the `_SurveyParticipant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SurveyParticipant" DROP CONSTRAINT "_SurveyParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_SurveyParticipant" DROP CONSTRAINT "_SurveyParticipant_B_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_SurveyParticipant";

-- CreateIndex
CREATE INDEX "IDX_ANSWER_OPTION_QUESTION" ON "AnswerOption"("FK_ID_QUESTION");

-- CreateIndex
CREATE INDEX "IDX_ANSWER_OPTION_RESPONSE" ON "AnswerOptionResponse"("FK_ID_QUESTION_RESPONSE", "FK_ID_ANSWER_OPTION");

-- CreateIndex
CREATE INDEX "IDX_NOTIFICATION_USER" ON "Notification"("FK_ID_USER");

-- CreateIndex
CREATE INDEX "IDX_NOTIFICATION_TITLE" ON "Notification"("title");

-- CreateIndex
CREATE INDEX "IDX_NOTIFICATION_CREATED_AT" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "IDX_QUESTION_SURVEY" ON "Question"("FK_ID_SURVEY");

-- CreateIndex
CREATE INDEX "IDX_QUESTION_RESPONSE" ON "QuestionResponse"("FK_ID_SURVEY_RESPONSE", "FK_ID_QUESTION");

-- CreateIndex
CREATE INDEX "IDX_SURVEY_TITLE" ON "Survey"("title");

-- CreateIndex
CREATE INDEX "IDX_SURVEY_RATING" ON "Survey"("rating");

-- CreateIndex
CREATE INDEX "IDX_SURVEY_CREATOR" ON "Survey"("FK_ID_USER");

-- CreateIndex
CREATE INDEX "IDX_SURVEY_INVITATION" ON "SurveyInvitation"("FK_ID_SURVEY", "FK_ID_USER");

-- CreateIndex
CREATE INDEX "IDX_SURVEY_RESPONSE" ON "SurveyResponse"("FK_ID_SURVEY", "FK_ID_USER");

-- CreateIndex
CREATE INDEX "IDX_EMAIL" ON "User"("email");
