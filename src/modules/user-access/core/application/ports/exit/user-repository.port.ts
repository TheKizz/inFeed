import { type PaginatedRepository } from "src/modules/shared/core/application/paginated-repository.abstract";
import { type UserEntity } from "../../../domain/entities/user.entity";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";

export interface IUserRepositoryPort
  extends Pick<PaginatedRepository<UUIDValueObject, UserEntity>, "search"> {
  save: (user: UserEntity) => Promise<void>;
}
