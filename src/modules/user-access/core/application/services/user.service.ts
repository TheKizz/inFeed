import { type RegisterUserUseCase } from "../use-cases/create-user.use-case";
import {
  type IUserEntityCreationProps,
  type UserEntity,
} from "../../domain/entities/user.entity";
import { type IUserServicePort } from "../ports/entry/user-service.port";

export class UserService implements IUserServicePort {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async createUser(
    userEntityCreationProps: IUserEntityCreationProps,
  ): Promise<UserEntity> {
    return await this.registerUserUseCase.execute(userEntityCreationProps);
  }
}
