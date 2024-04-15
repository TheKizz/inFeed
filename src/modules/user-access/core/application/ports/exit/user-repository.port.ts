import { type UserEntity } from "../../../domain/entities/user.entity";

export interface IUserRepositoryPort {
  save: (user: UserEntity) => Promise<void>;
}
