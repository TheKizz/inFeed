import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type SurveyEntity } from "../../domain/entities/survey.entity";
import { type ISurveyServicePort } from "../ports/entry/survey-service.port";
import { type SearchSurveysUseCase } from "../use-cases/search-surveys.use-case";

export class SurveyService implements ISurveyServicePort {
  constructor(private readonly searchSurveyUseCase: SearchSurveysUseCase) {}

  async searchSurveys(
    query: IQuery<UUIDValueObject>,
  ): Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>> {
    return await this.searchSurveyUseCase.execute(query);
  }
}
