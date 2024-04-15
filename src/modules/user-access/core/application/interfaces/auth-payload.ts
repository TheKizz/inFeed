import { type IUserEntityProps } from "../../domain/entities/user.entity";

export interface IAuthPayload extends Pick<IUserEntityProps, "id" | "email"> {}
