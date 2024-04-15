import {
  type IUserEntityCreationProps,
  UserEntity,
} from "../../domain/entities/user.entity";
import { type IUserRepositoryPort } from "../ports/exit/user-repository.port";
import { type IUseCase } from "../../../../shared/core/application/use-case.interface";
export class RegisterUserUseCase implements IUseCase<UserEntity> {
  constructor(private readonly userRepository: IUserRepositoryPort) {}

  async execute(
    registerUserProps: IUserEntityCreationProps,
  ): Promise<UserEntity> {
    const user = UserEntity.create(registerUserProps);
    await this.userRepository.save(user);
    return user;
  }
}
