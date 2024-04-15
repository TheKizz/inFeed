import { AuthServiceAdapter } from "./../../../infrastructure/adapters/services/auth-service.adapter";
import { Body, Controller, HttpStatus, Inject, Post } from "@nestjs/common";
import { IAuthServicePort } from "src/modules/user-access/core/application/ports/exit/auth-service.port";
import { RegisterUserDto } from "../dto/register-user.dto";
import { type IAuthResult } from "src/modules/user-access/core/application/interfaces/auth-result";
import { ResponseFactory } from "src/modules/shared/presentation/factories/response.factory";
import { UserEntity } from "src/modules/user-access/core/domain/entities/user.entity";
import { type IResponse } from "src/modules/shared/presentation/interfaces/response.interface";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthServiceAdapter) private readonly authService: IAuthServicePort,
  ) {}

  @Post("register")
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<IResponse<IAuthResult>> {
    const data: IAuthResult = await this.authService.register(registerUserDto);
    const user =
      data.user instanceof UserEntity ? data.user.toPrimitive() : data.user;
    delete user.password;
    return ResponseFactory.createSuccessfulResponse(
      HttpStatus.CREATED,
      "Usuario registrado exitosamente",
      {
        ...data,
        user,
      },
    );
  }
}
