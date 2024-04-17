import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type SurveyEntity } from "../../../domain/entities/survey.entity";

export interface ISurveyServicePort {
  searchSurveys: (
    query: IQuery<UUIDValueObject>,
  ) => Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>>;
}
