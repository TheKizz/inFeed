import { type PaginatedRepository } from "src/modules/shared/core/application/paginated-repository.abstract";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type SurveyEntity } from "../../../domain/entities/survey.entity";

export interface ISurveyRepositoryPort
  extends Pick<PaginatedRepository<UUIDValueObject, SurveyEntity>, "search"> {}
