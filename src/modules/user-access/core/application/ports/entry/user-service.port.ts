import { type UserEntity } from "../../../domain/entities/user.entity";
import { type StringValueObject } from "src/modules/shared/core/domain/string.value-object";

export interface IUserServicePort {
  findUserByEmail: (userEmail: StringValueObject) => Promise<UserEntity>;
}
