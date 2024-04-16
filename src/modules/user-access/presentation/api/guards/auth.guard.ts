import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../consts/public-resource.const";
import { type IAuthPayload } from "src/modules/user-access/core/application/interfaces/auth-payload";
import { IJwtService } from "src/modules/shared/core/application/jwt-service.interface";
import { TokenExpiredError } from "@nestjs/jwt";
import { IUserServicePort } from "src/modules/user-access/core/application/ports/entry/user-service.port";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: IJwtService,
    private readonly reflector: Reflector,
    private readonly userService: IUserServicePort,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const logger: Logger = new Logger(AuthGuard.name, { timestamp: true });
    if (this.isPublicResource(context)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        "No hay token en la petición",
        "No autorizado",
      );
    }
    try {
      const payload: IAuthPayload = await this.jwtService.verify(token);
      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException(
          "El usuario no existe",
          "No autorizado",
        );
      }
      if (!user.isOnline) {
        throw new UnauthorizedException(
          "El usuario no se encuentra conectado",
          "No autorizado",
        );
      }
      request.user = payload;
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(error.message, "No autorizado");
      }
      logger.error(error);
      throw new InternalServerErrorException(
        (error as Error).message,
        "No autorizado",
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private isPublicResource(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic;
  }
}
