import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IUseCase } from "src/modules/shared/core/application/use-case.interface";
import { type UserEntity } from "../../domain/entities/user.entity";
import { type IUserRepositoryPort } from "../ports/exit/user-repository.port";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type StringValueObject } from "src/modules/shared/core/domain/string.value-object";

export class FindUserByEmailUseCase implements IUseCase<UserEntity> {
  constructor(private readonly userRepository: IUserRepositoryPort) {}
  async execute(userEmail: StringValueObject): Promise<UserEntity> {
    const paginatedResult: IPaginatedResult<UUIDValueObject, UserEntity> =
      await this.userRepository.search({
        search: userEmail.value,
        page: 1,
        elementsPerPage: 1,
      });
    if (paginatedResult.totalElements !== 1) {
      throw new Error("Usuario no encontrado");
    }
    const user = paginatedResult.result[0];
    return user;
  }
}
