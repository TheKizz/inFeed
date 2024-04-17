import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import {
  type SurveyEntity,
  type ISurveyEntityUpdateProps,
} from "../../domain/entities/survey.entity";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";

export class UpdateSurveyUseCase implements IUseCase<SurveyEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(
    surveyToUpdate: SurveyEntity,
    surveyEntityUpdateProps: ISurveyEntityUpdateProps,
  ): Promise<SurveyEntity> {
    surveyToUpdate.update(surveyEntityUpdateProps);
    await this.surveyRepository.save(surveyToUpdate);
    return surveyToUpdate;
  }
}
