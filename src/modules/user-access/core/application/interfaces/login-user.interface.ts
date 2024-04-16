import { type IUserEntityProps } from "../../domain/entities/user.entity";

export interface ILoginUserProps
  extends Pick<IUserEntityProps, "email" | "password"> {}
