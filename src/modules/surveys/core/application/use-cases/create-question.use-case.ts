import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import {
  type IQuestionEntityCreationProps,
  type QuestionEntity,
} from "../../domain/entities/question.entity";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";
import { type SurveyEntity } from "../../domain/entities/survey.entity";

export class CreateQuestionUseCase implements IUseCase<QuestionEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    surveyEntity: SurveyEntity,
    questionEntityCreationProps: IQuestionEntityCreationProps,
  ): Promise<QuestionEntity> {
    const questionEntity: QuestionEntity = surveyEntity.createQuestion(
      questionEntityCreationProps,
    );
    await this.surveyRepository.saveQuestion(questionEntity);
    return questionEntity;
  }
}
