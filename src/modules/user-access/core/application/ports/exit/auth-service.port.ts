import { type IAuthResult } from "../../interfaces/auth-result";
import { type IRegisterUserProps } from "../../interfaces/register-user.interface";

export interface IAuthServicePort {
  register: (registerUserProps: IRegisterUserProps) => Promise<IAuthResult>;
}
