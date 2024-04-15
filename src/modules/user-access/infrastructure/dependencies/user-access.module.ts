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

@Module({
  providers: [
    {
      provide: PrismaUserRepositoryAdapter,
      useFactory: (prismaClient: PrismaClientAdapter) =>
        new PrismaUserRepositoryAdapter(prismaClient),
      inject: [PrismaClientAdapter],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository: IUserRepositoryPort) =>
        new RegisterUserUseCase(userRepository),
      inject: [PrismaUserRepositoryAdapter],
    },
    UserService,
    {
      provide: AuthServiceAdapter,
      useFactory: (
        registerUserUseCase: RegisterUserUseCase,
        encrypterService: IEncrypterService,
        jwtService: IJwtService,
      ) =>
        new AuthServiceAdapter(
          registerUserUseCase,
          encrypterService,
          jwtService,
          "secretOrPrivateKey",
        ),
      inject: [
        RegisterUserUseCase,
        BcryptEncrypterServiceAdapter,
        NestJwtServiceAdapter,
      ],
    },
  ],
  controllers: [AuthController],
})
export class UserAccessModule {}
