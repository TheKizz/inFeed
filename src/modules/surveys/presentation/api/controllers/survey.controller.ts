import {
  Body,
  Controller,
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

  @Post()
  async createSurvey(
    @Body() createSurveyDto: CreateSurveyDto,
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) id: UUIDValueObject,
  ): Promise<IResponse<IPrimitiveSurveyEntity>> {
    createSurveyDto.creatorId = id;
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
    @AuthenticatedUser("id", ParseUUIDValueObjectPipe) id: UUIDValueObject,
    @Param("surveyId", ParseUUIDValueObjectPipe) surveyId: UUIDValueObject,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    const data: SurveyEntity = await this.surveyService.updateSurvey(
      id,
      surveyId,
      updateSurveyDto,
    );
    return ResponseFactory.createSuccessfulResponse<IPrimitiveSurveyEntity>(
      HttpStatus.OK,
      "Encuesta actualizada",
      data.toPrimitive(),
    );
  }
}
