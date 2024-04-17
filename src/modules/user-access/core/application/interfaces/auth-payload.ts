import { type IPrimitiveUserEntity } from "../../domain/entities/user.entity";

export interface IAuthPayload
  extends Pick<IPrimitiveUserEntity, "id" | "email"> {}
