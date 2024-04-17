import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type SurveyEntity } from "../../domain/entities/survey.entity";
import { type ISurveyRepositoryPort } from "../ports/exit/survey-repository.port";

export class DeleteSurveyUseCase implements IUseCase<SurveyEntity> {
  constructor(private readonly surveyRepository: ISurveyRepositoryPort) {}

  async execute(surveyToDelete: SurveyEntity): Promise<SurveyEntity> {
    await this.surveyRepository.delete(surveyToDelete);
    return surveyToDelete;
  }
}
