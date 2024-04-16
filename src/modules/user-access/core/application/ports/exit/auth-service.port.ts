import { type IAuthResult } from "../../interfaces/auth-result";
import { type ILoginUserProps } from "../../interfaces/login-user.interface";
import { type IRegisterUserProps } from "../../interfaces/register-user.interface";

export interface IAuthServicePort {
  register: (registerUserProps: IRegisterUserProps) => Promise<IAuthResult>;
  login: (loginUserProps: ILoginUserProps) => Promise<IAuthResult>;
}
