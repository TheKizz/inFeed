import { type FindUserByEmailUseCase } from "./../../../core/application/use-cases/find-user-by-email.use-case";
import { type IEncrypterService } from "src/modules/shared/core/application/encrypter-service.interface";
import { type IJwtService } from "src/modules/shared/core/application/jwt-service.interface";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { type IAuthPayload } from "src/modules/user-access/core/application/interfaces/auth-payload";
import { type IAuthResult } from "src/modules/user-access/core/application/interfaces/auth-result";
import { type ILoginUserProps } from "src/modules/user-access/core/application/interfaces/login-user.interface";
import { type IRegisterUserProps } from "src/modules/user-access/core/application/interfaces/register-user.interface";
import { type IAuthServicePort } from "src/modules/user-access/core/application/ports/exit/auth-service.port";
import { type RegisterUserUseCase } from "src/modules/user-access/core/application/use-cases/create-user.use-case";
import { type LoginUserUseCase } from "src/modules/user-access/core/application/use-cases/login-user.use-case";
import { type LogoutUserUseCase } from "src/modules/user-access/core/application/use-cases/logout-user.use-case";
import { type UserEntity } from "src/modules/user-access/core/domain/entities/user.entity";

export class AuthServiceAdapter implements IAuthServicePort {
  constructor(
    private readonly encrypterService: IEncrypterService,
    private readonly jwtService: IJwtService,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly findUserByEmail: FindUserByEmailUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
  ) {}

  async register(registerUserProps: IRegisterUserProps): Promise<IAuthResult> {
    const hashedPassword: string = await this.encrypterService.encrypt(
      registerUserProps.password.toPrimitive(),
    );
    const userEntity: UserEntity = await this.registerUserUseCase.execute({
      ...registerUserProps,
      password: new StringValueObject(hashedPassword),
    });
    const token: string = await this.jwtService.sign<IAuthPayload>({
      id: userEntity.id,
      email: userEntity.email,
    });
    return {
      user: userEntity,
      token,
    };
  }

  async login(loginUserProps: ILoginUserProps): Promise<IAuthResult> {
    let userEntity: UserEntity = await this.findUserByEmail.execute(
      loginUserProps.email,
    );
    const isPasswordMatch: boolean = await this.encrypterService.compare(
      loginUserProps.password.toPrimitive(),
      userEntity.password.toPrimitive(),
    );
    if (!isPasswordMatch) {
      throw new Error("Las credenciales proporcionadas son incorrectas");
    }
    userEntity = await this.loginUserUseCase.execute(userEntity);
    const token: string = await this.jwtService.sign<IAuthPayload>({
      id: userEntity.id,
      email: userEntity.email,
    });
    return {
      user: userEntity,
      token,
    };
  }

  async logout(userEmail: StringValueObject): Promise<void> {
    const userEntity: UserEntity =
      await this.findUserByEmail.execute(userEmail);
    await this.logoutUserUseCase.execute(userEntity);
  }
}
