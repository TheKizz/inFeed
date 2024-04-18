import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";
import {
  type IQuestionEntityUpdateProps,
  type QuestionEntity,
} from "../../domain/entities/question.entity";
import { type SurveyEntity } from "../../domain/entities/survey.entity";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";

export class UpdateQuestionByIdUseCase implements IUseCase<QuestionEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    survey: SurveyEntity,
    questionId: UUIDValueObject,
    questionUpdateProps: IQuestionEntityUpdateProps,
  ): Promise<QuestionEntity> {
    const question: QuestionEntity = survey.updateQuestionById(
      questionId,
      questionUpdateProps,
    );
    await this.surveyRepository.saveQuestion(question);
    return question;
  }
}
