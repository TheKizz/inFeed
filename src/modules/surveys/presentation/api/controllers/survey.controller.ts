import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ISurveyServicePort } from "../../../core/application/ports/entry/survey-service.port";
import { type IResponse } from "src/modules/shared/presentation/interfaces/response.interface";
import {
  type IPrimitiveSurveyEntity,
  type SurveyEntity,
} from "../../../core/domain/entities/survey.entity";
import { QueryDto } from "src/modules/shared/presentation/dto/query.dto";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { ResponseFactory } from "src/modules/shared/presentation/factories/response.factory";
import { PublicResource } from "src/modules/user-access/presentation/api/consts/public-resource.const";
import { SurveyService } from "../../../core/application/services/survey.service";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { AuthenticatedUser } from "src/modules/user-access/presentation/api/decorators/authenticated-user.decorator";
import { ParseUUIDValueObjectPipe } from "src/modules/shared/presentation/pipes/parse-uuid-value-object.pipe";
import { toPrimitivePaginatedResult } from "src/modules/shared/presentation/utils/to-primitive-paginated-result.util";
import { UpdateSurveyDto } from "../dto/update-survey.dto";
import { CreateQuestionDto } from "../dto/create-question.dto";
import {
  type IPrimitiveQuestionEntity,
  type QuestionEntity,
} from "src/modules/surveys/core/domain/entities/question.entity";
import { UpdateQuestionDto } from "../dto/update-question.dto";

@Controller("surveys")
export class SurveyController {
  constructor(
    @Inject(SurveyService) private readonly surveyService: ISurveyServicePort,
  ) {}

  @Get()
  @PublicResource()
  async searchSurveys(
    @Query() queryDto: QueryDto<UUIDValueObject>,
  ): Promise<IResponse<IPaginatedResult<string, IPrimitiveSurveyEntity>>> {
    const data: IPaginatedResult<UUIDValueObject, SurveyEntity> =
      await this.surveyService.searchSurveys(queryDto);
    const primitiveData: IPaginatedResult<string, IPrimitiveSurveyEntity> =
      toPrimitivePaginatedResult(data);
    return ResponseFactory.createSuccessfulResponse<
      IPaginatedResult<string, IPrimitiveSurveyEntity>
    >(HttpStatus.OK, "Encuestas encontradas", primitiveData);
  }

  @Get(":surveyId")
  @PublicResource()
  async findSurveyById(
    @Param("surveyId", ParseUUIDValueObjectPipe) surveyId: UUIDValueObject,
  ): Promise<IResponse<IPrimitiveSurveyEntity>> {
    const data: SurveyEntity =
      await this.surveyService.findSurveyById(surveyId);
    return ResponseFactory.createSuccessfulResponse<IPrimitiveSurveyEntity>(
      HttpStatus.OK,
      "Encuesta encontrada",
      data.toPrimitive(),
    );
  }

  @Post()
  async createSurvey(
    @Body() createSurveyDto: CreateSurveyDto,
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) userId: UUIDValueObject,
  ): Promise<IResponse<IPrimitiveSurveyEntity>> {
    createSurveyDto.creatorId = userId;
    const data: SurveyEntity =
      await this.surveyService.createSurvey(createSurveyDto);
    return ResponseFactory.createSuccessfulResponse<IPrimitiveSurveyEntity>(
      HttpStatus.CREATED,
      "Encuesta creada",
      data.toPrimitive(),
    );
  }

  @Patch(":surveyId")
  async updateSurvey(
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) userId: UUIDValueObject,
    @Param("surveyId", ParseUUIDValueObjectPipe) surveyId: UUIDValueObject,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ): Promise<IResponse<IPrimitiveSurveyEntity>> {
    const data: SurveyEntity = await this.surveyService.updateSurveyById(
      userId,
      surveyId,
      updateSurveyDto,
    );
    return ResponseFactory.createSuccessfulResponse<IPrimitiveSurveyEntity>(
      HttpStatus.OK,
      "Encuesta actualizada",
      data.toPrimitive(),
    );
  }

  @Delete(":surveyId")
  async deleteSurvey(
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) userId: UUIDValueObject,
    @Param("surveyId", ParseUUIDValueObjectPipe) surveyId: UUIDValueObject,
  ): Promise<IResponse<IPrimitiveSurveyEntity>> {
    const data: SurveyEntity = await this.surveyService.deleteSurveyById(
      userId,
      surveyId,
    );
    return ResponseFactory.createSuccessfulResponse<IPrimitiveSurveyEntity>(
      HttpStatus.OK,
      "Encuesta eliminada",
      data.toPrimitive(),
    );
  }

  // Questions
  @Post(":surveyId/questions")
  async createQuestion(
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) userId: UUIDValueObject,
    @Param("surveyId", ParseUUIDValueObjectPipe) surveyId: UUIDValueObject,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<IResponse<IPrimitiveQuestionEntity>> {
    createQuestionDto.surveyId = surveyId;
    const data: QuestionEntity = await this.surveyService.createQuestion(
      userId,
      surveyId,
      createQuestionDto,
    );
    return ResponseFactory.createSuccessfulResponse<IPrimitiveQuestionEntity>(
      HttpStatus.CREATED,
      "Pregunta creada",
      data.toPrimitive(),
    );
  }

  @Patch(":surveyId/questions/:questionId")
  async updateQuestion(
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) userId: UUIDValueObject,
    @Param("surveyId", ParseUUIDValueObjectPipe) surveyId: UUIDValueObject,
    @Param("questionId", ParseUUIDValueObjectPipe) questionId: UUIDValueObject,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<IResponse<IPrimitiveQuestionEntity>> {
    const data: QuestionEntity = await this.surveyService.updateQuestionById(
      userId,
      surveyId,
      questionId,
      updateQuestionDto,
    );
    return ResponseFactory.createSuccessfulResponse<IPrimitiveQuestionEntity>(
      HttpStatus.OK,
      "Pregunta actualizada",
      data.toPrimitive(),
    );
  }

  @Delete(":surveyId/questions/:questionId")
  async deleteQuestionById(
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) userId: UUIDValueObject,
    @Param("surveyId", ParseUUIDValueObjectPipe) surveyId: UUIDValueObject,
    @Param("questionId", ParseUUIDValueObjectPipe) questionId: UUIDValueObject,
  ): Promise<IResponse<IPrimitiveQuestionEntity>> {
    const data: QuestionEntity = await this.surveyService.deleteQuestionById(
      userId,
      surveyId,
      questionId,
    );
    return ResponseFactory.createSuccessfulResponse<IPrimitiveQuestionEntity>(
      HttpStatus.OK,
      "Pregunta eliminada",
      data.toPrimitive(),
    );
  }
}
