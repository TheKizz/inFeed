import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import {
  type ISurveyEntityCreationProps,
  SurveyEntity,
} from "../../domain/entities/survey.entity";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";

export class CreateSurveyUseCase implements IUseCase<SurveyEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    surveyEntityCreationProps: ISurveyEntityCreationProps,
  ): Promise<SurveyEntity> {
    const surveyEntity = SurveyEntity.create(surveyEntityCreationProps);
    await this.surveyRepository.save(surveyEntity);
    return surveyEntity;
  }
}
