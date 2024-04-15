import { type IEncrypterService } from "src/modules/shared/core/application/encrypter-service.interface";
import { type IJwtService } from "src/modules/shared/core/application/jwt-service.interface";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { type IAuthPayload } from "src/modules/user-access/core/application/interfaces/auth-payload";
import { type IAuthResult } from "src/modules/user-access/core/application/interfaces/auth-result";
import { type IRegisterUserProps } from "src/modules/user-access/core/application/interfaces/register-user.interface";
import { type IAuthServicePort } from "src/modules/user-access/core/application/ports/exit/auth-service.port";
import { type RegisterUserUseCase } from "src/modules/user-access/core/application/use-cases/create-user.use-case";
import { type UserEntity } from "src/modules/user-access/core/domain/entities/user.entity";

export class AuthServiceAdapter implements IAuthServicePort {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly encrypterService: IEncrypterService,
    private readonly jwtService: IJwtService,
    private readonly jwtSecretOrPrivateKey: string,
  ) {}

  async register(registerUserProps: IRegisterUserProps): Promise<IAuthResult> {
    const hashedPassword: string = await this.encrypterService.encrypt(
      registerUserProps.password.toPrimitive(),
    );
    const user: UserEntity = await this.registerUserUseCase.execute({
      ...registerUserProps,
      password: new StringValueObject(hashedPassword),
    });
    const token: string = await this.jwtService.sign<IAuthPayload>(
      {
        id: user.id,
        email: user.email,
      },
      { secret: this.jwtSecretOrPrivateKey },
    );
    return {
      user,
      token,
    };
  }
}
