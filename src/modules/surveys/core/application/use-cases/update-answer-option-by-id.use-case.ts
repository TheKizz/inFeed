import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";
import { type QuestionEntity } from "../../domain/entities/question.entity";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import {
  type AnswerOptionEntity,
  type IAnswerOptionEntityUpdateProps,
} from "../../domain/entities/answer-option.entity";

export class UpdateAnswerOptionByIdUseCase
  implements IUseCase<AnswerOptionEntity>
{
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    question: QuestionEntity,
    answerOptionId: UUIDValueObject,
    answerOptionUpdateProps: IAnswerOptionEntityUpdateProps,
  ): Promise<AnswerOptionEntity> {
    const answerOption: AnswerOptionEntity = question.updateAnswerOptionById(
      answerOptionId,
      answerOptionUpdateProps,
    );
    await this.surveyRepository.saveAnswerOption(answerOption);
    return answerOption;
  }
}
