import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";
import { type SurveyEntity } from "../../domain/entities/survey.entity";

export class FindSurveyByIdUseCase implements IUseCase<SurveyEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}
  async execute(surveyId: UUIDValueObject): Promise<SurveyEntity> {
    const paginatedResult: IPaginatedResult<UUIDValueObject, SurveyEntity> =
      await this.surveyRepository.search({
        search: surveyId.value,
        page: 1,
        elementsPerPage: 1,
      });
    if (paginatedResult.totalElements !== 1) {
      throw new Error("Encuesta no encontrada");
    }
    return paginatedResult.result[0];
  }
}
