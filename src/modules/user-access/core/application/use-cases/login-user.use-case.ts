import { type IUseCase } from "../../../../shared/core/application/use-case.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { type IUserRepositoryPort } from "../ports/exit/user-repository.port";
export class LoginUserUseCase implements IUseCase<UserEntity> {
  constructor(private readonly userRepository: IUserRepositoryPort) {}

  async execute(userEntityToLogin: UserEntity): Promise<UserEntity> {
    const userEntity: UserEntity = new UserEntity(userEntityToLogin);
    userEntity.establishIsOnline();
    await this.userRepository.save(userEntity);
    return userEntity;
  }
}
