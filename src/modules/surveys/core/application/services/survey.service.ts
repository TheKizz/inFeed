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
import { type DeleteSurveyUseCase } from "../use-cases/delete-survey.use-case";
import {
  type IQuestionEntityCreationProps,
  type QuestionEntity,
} from "../../domain/entities/question.entity";
import { type CreateQuestionUseCase } from "../use-cases/create-question.use-case";
import { type UpdateQuestionByIdUseCase } from "../use-cases/update-question-by-id.use-case";
import { type DeleteQuestionByIdUseCase } from "../use-cases/delete-question-by-id.use-case";

export class SurveyService implements ISurveyServicePort {
  constructor(
    private readonly searchSurveyUseCase: SearchSurveysUseCase,
    private readonly createSurveyUseCase: CreateSurveyUseCase,
    private readonly findSurveyByIdUseCase: FindSurveyByIdUseCase,
    private readonly updateSurveyUseCase: UpdateSurveyUseCase,
    private readonly deleteSurveyUseCase: DeleteSurveyUseCase,
    private readonly createQuestionUseCase: CreateQuestionUseCase,
    private readonly updateQuestionByIdUseCase: UpdateQuestionByIdUseCase,
    private readonly deleteQuestionByIdUseCase: DeleteQuestionByIdUseCase,
  ) {}

  async searchSurveys(
    query: IQuery<UUIDValueObject>,
  ): Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>> {
    return await this.searchSurveyUseCase.execute(query);
  }

  async findSurveyById(surveyId: UUIDValueObject): Promise<SurveyEntity> {
    return await this.findSurveyByIdUseCase.execute(surveyId);
  }

  async createSurvey(
    surveyEntityCreationProps: ISurveyEntityCreationProps,
  ): Promise<SurveyEntity> {
    return await this.createSurveyUseCase.execute(surveyEntityCreationProps);
  }

  async updateSurveyById(
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    surveyEntityUpdateProps: ISurveyEntityUpdateProps,
  ): Promise<SurveyEntity> {
    const survey: SurveyEntity = await this.findSurveyById(surveyId);
    this.validateUserPermissions(userId, survey);
    const updatedSurvey: SurveyEntity = await this.updateSurveyUseCase.execute(
      survey,
      surveyEntityUpdateProps,
    );
    return updatedSurvey;
  }

  async deleteSurveyById(
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
  ): Promise<SurveyEntity> {
    const survey: SurveyEntity = await this.findSurveyById(surveyId);
    this.validateUserPermissions(userId, survey);
    const deletedSurvey: SurveyEntity =
      await this.deleteSurveyUseCase.execute(survey);
    return deletedSurvey;
  }

  async createQuestion(
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    questionEntityCreationProps: IQuestionEntityCreationProps,
  ): Promise<QuestionEntity> {
    const survey: SurveyEntity = await this.findSurveyById(surveyId);
    this.validateUserPermissions(userId, survey);
    const question: QuestionEntity = await this.createQuestionUseCase.execute(
      survey,
      questionEntityCreationProps,
    );
    return question;
  }

  async updateQuestionById(
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    questionId: UUIDValueObject,
    questionUpdateProps: ISurveyEntityUpdateProps,
  ): Promise<QuestionEntity> {
    const survey: SurveyEntity = await this.findSurveyById(surveyId);
    this.validateUserPermissions(userId, survey);
    const question: QuestionEntity =
      await this.updateQuestionByIdUseCase.execute(
        survey,
        questionId,
        questionUpdateProps,
      );
    return question;
  }

  async deleteQuestionById(
    userId: UUIDValueObject,
    surveyId: UUIDValueObject,
    questionId: UUIDValueObject,
  ): Promise<QuestionEntity> {
    const survey: SurveyEntity = await this.findSurveyById(surveyId);
    this.validateUserPermissions(userId, survey);
    const deletedQuestion: QuestionEntity =
      await this.deleteQuestionByIdUseCase.execute(survey, questionId);
    return deletedQuestion;
  }

  private validateUserPermissions(
    userId: UUIDValueObject,
    survey: SurveyEntity,
  ): void {
    if (!survey.creatorId.equals(userId)) {
      throw new Error(
        "No tienes permisos para actualizar la encuesta de otro usuario",
      );
    }
  }
}
