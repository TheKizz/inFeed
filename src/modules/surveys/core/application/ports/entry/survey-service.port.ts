import { type ISurveyEntityUpdateProps } from "./../../../domain/entities/survey.entity";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import {
  type ISurveyEntityCreationProps,
  type SurveyEntity,
} from "../../../domain/entities/survey.entity";
import {
  type IQuestionEntityCreationProps,
  type QuestionEntity,
} from "../../../domain/entities/question.entity";

export interface ISurveyServicePort {
  searchSurveys: (
    query: IQuery<UUIDValueObject>,
  ) => Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>>;
  createSurvey: (
    surveyEntityCreationProps: ISurveyEntityCreationProps,
  ) => Promise<SurveyEntity>;
  updateSurveyById: (
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    surveyEntityUpdateProps: ISurveyEntityUpdateProps,
  ) => Promise<SurveyEntity>;
  deleteSurveyById: (
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
  ) => Promise<SurveyEntity>;
  createQuestion: (
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    questionEntityCreationProps: IQuestionEntityCreationProps,
  ) => Promise<QuestionEntity>;
  updateQuestionById: (
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    questionId: UUIDValueObject,
    questionUpdateProps: ISurveyEntityUpdateProps,
  ) => Promise<QuestionEntity>;
  deleteQuestionById: (
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    questionId: UUIDValueObject,
  ) => Promise<QuestionEntity>;
}
