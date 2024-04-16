import { type IUseCase } from "../../../../shared/core/application/use-case.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { type IUserRepositoryPort } from "../ports/exit/user-repository.port";

export class LogoutUserUseCase implements IUseCase<void> {
  constructor(private readonly userRepository: IUserRepositoryPort) {}

  async execute(userEntityToLogout: UserEntity): Promise<void> {
    const userEntity: UserEntity = new UserEntity(userEntityToLogout);
    userEntity.establishIsOffline();
    await this.userRepository.save(userEntity);
  }
}
