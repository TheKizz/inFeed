import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import {
  type ISurveyEntityUpdateProps,
  type ISurveyEntityCreationProps,
  type SurveyEntity,
} from "../../domain/entities/survey.entity";
import { type ISurveyServicePort } from "../ports/entry/survey-service.port";
import { type SearchSurveysUseCase } from "../use-cases/search-surveys.use-case";
import { type CreateSurveyUseCase } from "../use-cases/create-survey.use-case";
import { type FindSurveyByIdUseCase } from "../use-cases/find-survey-by-id.use-case";
import { type UpdateSurveyUseCase } from "../use-cases/update-survey.use-case";

export class SurveyService implements ISurveyServicePort {
  constructor(
    private readonly searchSurveyUseCase: SearchSurveysUseCase,
    private readonly createSurveyUseCase: CreateSurveyUseCase,
    private readonly findSurveyByIdUseCase: FindSurveyByIdUseCase,
    private readonly updateSurveyUseCase: UpdateSurveyUseCase,
  ) {}

  async searchSurveys(
    query: IQuery<UUIDValueObject>,
  ): Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>> {
    return await this.searchSurveyUseCase.execute(query);
  }

  async createSurvey(
    surveyEntityCreationProps: ISurveyEntityCreationProps,
  ): Promise<SurveyEntity> {
    return await this.createSurveyUseCase.execute(surveyEntityCreationProps);
  }

  async updateSurvey(
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    surveyEntityUpdateProps: ISurveyEntityUpdateProps,
  ): Promise<SurveyEntity> {
    const survey: SurveyEntity =
      await this.findSurveyByIdUseCase.execute(surveyId);
    if (survey.creatorId.value !== userId.value) {
      throw new Error(
        "No tienes permisos para actualizar la encuesta de otro usuario",
      );
    }
    const updatedSurvey: SurveyEntity = await this.updateSurveyUseCase.execute(
      survey,
      surveyEntityUpdateProps,
    );
    return updatedSurvey;
  }
}
