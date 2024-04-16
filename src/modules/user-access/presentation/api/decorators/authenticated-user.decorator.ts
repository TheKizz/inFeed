import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { type IAuthPayload } from "src/modules/user-access/core/application/interfaces/auth-payload";

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuthPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
