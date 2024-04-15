import {
  type IPrimitiveUserEntity,
  type UserEntity,
} from "../../domain/entities/user.entity";

export interface IAuthResult {
  user:
    | UserEntity
    | (Omit<IPrimitiveUserEntity, "password"> &
        Partial<Pick<IPrimitiveUserEntity, "password">>);
  token: string;
}
