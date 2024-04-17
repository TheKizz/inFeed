import { AuthServiceAdapter } from "./../../../infrastructure/adapters/services/auth-service.adapter";
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import { IAuthServicePort } from "src/modules/user-access/core/application/ports/exit/auth-service.port";
import { RegisterUserDto } from "../dto/register-user.dto";
import { type IAuthResult } from "src/modules/user-access/core/application/interfaces/auth-result";
import { ResponseFactory } from "src/modules/shared/presentation/factories/response.factory";
import { UserEntity } from "src/modules/user-access/core/domain/entities/user.entity";
import { type IResponse } from "src/modules/shared/presentation/interfaces/response.interface";
import { LoginUserDto } from "../dto/login-user.dto";
import { PublicResource } from "../consts/public-resource.const";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { ParseStringValueObjectPipe } from "src/modules/shared/presentation/pipes/parse-string-value-object.pipe";

@PublicResource()
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
    const primitiveUser =
      data.user instanceof UserEntity ? data.user.toPrimitive() : data.user;
    delete primitiveUser.password;
    return ResponseFactory.createSuccessfulResponse(
      HttpStatus.CREATED,
      "Usuario registrado exitosamente",
      {
        ...data,
        user: primitiveUser,
      },
    );
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<IResponse<IAuthResult>> {
    const data: IAuthResult = await this.authService.login(loginUserDto);
    const primitiveUser =
      data.user instanceof UserEntity ? data.user.toPrimitive() : data.user;
    delete primitiveUser.password;
    return ResponseFactory.createSuccessfulResponse(
      HttpStatus.CREATED,
      "Usuario registrado exitosamente",
      {
        ...data,
        user: primitiveUser,
      },
    );
  }

  @Post("logout/:userEmail")
  async logout(
    @Param("userEmail", ParseStringValueObjectPipe)
    userEmail: StringValueObject,
  ): Promise<IResponse<undefined>> {
    await this.authService.logout(userEmail);
    return ResponseFactory.createSuccessfulResponse(
      HttpStatus.OK,
      "Sesión cerrada exitosamente",
    );
  }
}
