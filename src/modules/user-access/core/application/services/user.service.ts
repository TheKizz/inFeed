import { type UserEntity } from "../../domain/entities/user.entity";
import { type IUserServicePort } from "../ports/entry/user-service.port";
import { type StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { type FindUserByEmailUseCase } from "../use-cases/find-user-by-email.use-case";

export class UserService implements IUserServicePort {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  async findUserByEmail(userEmail: StringValueObject): Promise<UserEntity> {
    return await this.findUserByEmailUseCase.execute(userEmail);
  }
}
