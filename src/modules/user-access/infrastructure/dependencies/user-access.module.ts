import { Module } from "@nestjs/common";
import { PrismaUserRepositoryAdapter } from "../adapters/repositories/prisma-user-repository.adapter";
import { UserService } from "../../core/application/services/user.service";
import { RegisterUserUseCase } from "../../core/application/use-cases/create-user.use-case";
import { type IUserRepositoryPort } from "../../core/application/ports/exit/user-repository.port";
import { AuthController } from "../../presentation/api/controllers/auth.controller";
import { AuthServiceAdapter } from "../adapters/services/auth-service.adapter";
import { BcryptEncrypterServiceAdapter } from "src/modules/shared/infrastructure/adapters/services/bcrypt-encrypter-service.adapter";
import { NestJwtServiceAdapter } from "src/modules/shared/infrastructure/adapters/services/nest-jwt-service.adapter";
import { type IEncrypterService } from "src/modules/shared/core/application/encrypter-service.interface";
import { type IJwtService } from "src/modules/shared/core/application/jwt-service.interface";
import { PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { FindUserByEmailUseCase } from "../../core/application/use-cases/find-user-by-email.use-case";
import { LoginUserUseCase } from "../../core/application/use-cases/login-user.use-case";

@Module({
  providers: [
    // Repositories
    {
      provide: PrismaUserRepositoryAdapter,
      useFactory: (prismaClient: PrismaClientAdapter) =>
        new PrismaUserRepositoryAdapter(prismaClient),
      inject: [PrismaClientAdapter],
    },
    // Use Cases
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository: IUserRepositoryPort) =>
        new RegisterUserUseCase(userRepository),
      inject: [PrismaUserRepositoryAdapter],
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (userRepository: IUserRepositoryPort) =>
        new FindUserByEmailUseCase(userRepository),
      inject: [PrismaUserRepositoryAdapter],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository: IUserRepositoryPort) =>
        new LoginUserUseCase(userRepository),
      inject: [PrismaUserRepositoryAdapter],
    },
    // Services
    UserService,
    {
      provide: AuthServiceAdapter,
      useFactory: (
        encrypterService: IEncrypterService,
        jwtService: IJwtService,
        registerUserUseCase: RegisterUserUseCase,
        findUserByEmail: FindUserByEmailUseCase,
        loginUserUseCase: LoginUserUseCase,
      ) =>
        new AuthServiceAdapter(
          encrypterService,
          jwtService,
          registerUserUseCase,
          findUserByEmail,
          loginUserUseCase,
        ),
      inject: [
        BcryptEncrypterServiceAdapter,
        NestJwtServiceAdapter,
        RegisterUserUseCase,
        FindUserByEmailUseCase,
        LoginUserUseCase,
      ],
    },
  ],
  controllers: [AuthController],
})
export class UserAccessModule {}
