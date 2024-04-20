import { type PaginatedRepository } from "src/modules/shared/core/application/paginated-repository.abstract";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type SurveyEntity } from "../../../domain/entities/survey.entity";
import { type QuestionEntity } from "../../../domain/entities/question.entity";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type ISurveyRepositoryInclude } from "../../interfaces/survey-repository-include.interface";
import { type AnswerOptionEntity } from "../../../domain/entities/answer-option.entity";

export interface ISurveyRepositoryPort
  extends Pick<PaginatedRepository<UUIDValueObject, SurveyEntity>, "search"> {
  search: (
    query: IQuery<UUIDValueObject>,
    includes?: ISurveyRepositoryInclude,
  ) => Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>>;
  save: (surveyEntity: SurveyEntity) => Promise<void>;
  delete: (surveyEntity: SurveyEntity) => Promise<void>;
  saveQuestion: (questionEntity: QuestionEntity) => Promise<void>;
  deleteQuestion: (questionToDelete: QuestionEntity) => Promise<void>;
  saveAnswerOption: (answerOptionEntity: AnswerOptionEntity) => Promise<void>;
  deleteAnswerOption: (
    answerOptionToDelete: AnswerOptionEntity,
  ) => Promise<void>;
}
