import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { type IAuthPayload } from "src/modules/user-access/core/application/interfaces/auth-payload";

type AuthPayloadProperty = keyof IAuthPayload | undefined;

export const AuthenticatedUser = createParamDecorator(
  (key: AuthPayloadProperty = undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authPayload: IAuthPayload = request.user;
    if (key && authPayload[key] === undefined) {
      throw new Error(
        `El usuario autenticado no tiene la propiedad ${key} definida`,
      );
    }
    return key ? authPayload[key] : authPayload;
  },
);
