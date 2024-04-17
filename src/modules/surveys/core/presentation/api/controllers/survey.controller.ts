import { Controller, Get, HttpStatus, Inject, Query } from "@nestjs/common";
import { ISurveyServicePort } from "../../../application/ports/entry/survey-service.port";
import { type IResponse } from "src/modules/shared/presentation/interfaces/response.interface";
import { type SurveyEntity } from "../../../domain/entities/survey.entity";
import { QueryDto } from "src/modules/shared/presentation/dto/query.dto";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { ResponseFactory } from "src/modules/shared/presentation/factories/response.factory";
import { PublicResource } from "src/modules/user-access/presentation/api/consts/public-resource.const";
import { SurveyService } from "../../../application/services/survey.service";

@Controller("surveys")
export class SurveyController {
  constructor(
    @Inject(SurveyService) private readonly surveyService: ISurveyServicePort,
  ) {}

  @Get()
  @PublicResource()
  async search(
    @Query() query: QueryDto<UUIDValueObject>,
  ): Promise<IResponse<IPaginatedResult<UUIDValueObject, SurveyEntity>>> {
    const data: IPaginatedResult<UUIDValueObject, SurveyEntity> =
      await this.surveyService.searchSurveys(query);
    return ResponseFactory.createSuccessfulResponse<
      IPaginatedResult<UUIDValueObject, SurveyEntity>
    >(HttpStatus.OK, "Encuestas encontradas", data);
  }
}
