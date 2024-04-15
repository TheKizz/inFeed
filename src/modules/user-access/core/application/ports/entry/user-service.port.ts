import {
  type IUserEntityCreationProps,
  type UserEntity,
} from "../../../domain/entities/user.entity";

export interface IUserServicePort {
  createUser: (
    userCreationProps: IUserEntityCreationProps,
  ) => Promise<UserEntity>;
}
