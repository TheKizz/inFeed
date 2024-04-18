import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";
import { type QuestionEntity } from "../../domain/entities/question.entity";
import { type SurveyEntity } from "../../domain/entities/survey.entity";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";

export class DeleteQuestionByIdUseCase implements IUseCase<QuestionEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    survey: SurveyEntity,
    questionId: UUIDValueObject,
  ): Promise<QuestionEntity> {
    const deletedQuestion: QuestionEntity =
      survey.deleteQuestionById(questionId);
    await this.surveyRepository.deleteQuestion(deletedQuestion);
    return deletedQuestion;
  }
}
