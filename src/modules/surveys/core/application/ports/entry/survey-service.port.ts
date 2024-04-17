import { type ISurveyEntityUpdateProps } from "./../../../domain/entities/survey.entity";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import {
  type ISurveyEntityCreationProps,
  type SurveyEntity,
} from "../../../domain/entities/survey.entity";

export interface ISurveyServicePort {
  searchSurveys: (
    query: IQuery<UUIDValueObject>,
  ) => Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>>;
  createSurvey: (
    surveyEntityCreationProps: ISurveyEntityCreationProps,
  ) => Promise<SurveyEntity>;
  updateSurvey: (
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    surveyEntityUpdateProps: ISurveyEntityUpdateProps,
  ) => Promise<SurveyEntity>;
  deleteSurvey: (
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
  ) => Promise<SurveyEntity>;
}
