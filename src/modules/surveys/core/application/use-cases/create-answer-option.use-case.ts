import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type QuestionEntity } from "../../domain/entities/question.entity";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";
import {
  type AnswerOptionEntity,
  type IAnswerOptionEntityCreationProps,
} from "../../domain/entities/answer-option.entity";

export class CreateAnswerOptionUseCase implements IUseCase<AnswerOptionEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    questionEntity: QuestionEntity,
    answerOptionEntityCreationProps: IAnswerOptionEntityCreationProps,
  ): Promise<AnswerOptionEntity> {
    const answerOptionEntity: AnswerOptionEntity =
      questionEntity.createAnswerOption(answerOptionEntityCreationProps);
    await this.surveyRepository.saveAnswerOption(answerOptionEntity);
    return answerOptionEntity;
  }
}
