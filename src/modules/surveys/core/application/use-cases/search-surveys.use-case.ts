import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type SurveyEntity } from "../../domain/entities/survey.entity";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";

export class SearchSurveysUseCase
  implements IUseCase<IPaginatedResult<UUIDValueObject, SurveyEntity>>
{
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    query: IQuery<UUIDValueObject>,
  ): Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>> {
    return await this.surveyRepository.search(query);
  }
}
