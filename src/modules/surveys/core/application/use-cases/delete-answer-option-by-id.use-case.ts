import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";
import { type QuestionEntity } from "../../domain/entities/question.entity";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type AnswerOptionEntity } from "../../domain/entities/answer-option.entity";

export class DeleteAnswerOptionByIdUseCase
  implements IUseCase<AnswerOptionEntity>
{
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    question: QuestionEntity,
    answerOptionId: UUIDValueObject,
  ): Promise<AnswerOptionEntity> {
    const deletedAnswerOption: AnswerOptionEntity =
      question.deleteAnswerOptionById(answerOptionId);
    await this.surveyRepository.deleteAnswerOption(deletedAnswerOption);
    return deletedAnswerOption;
  }
}
