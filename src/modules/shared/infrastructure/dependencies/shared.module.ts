import { Global, Module } from "@nestjs/common";
import { PrismaClientAdapter } from "../clients/prisma.client";
import { BcryptEncrypterServiceAdapter } from "../adapters/services/bcrypt-encrypter-service.adapter";
import { NestJwtServiceAdapter } from "../adapters/services/nest-jwt-service.adapter";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Global()
@Module({
  providers: [
    PrismaClientAdapter,
    BcryptEncrypterServiceAdapter,
    {
      provide: NestJwtServiceAdapter,
      useFactory: (nestJwtService: JwtService) =>
        new NestJwtServiceAdapter(nestJwtService),
      inject: [JwtService],
    },
  ],
  exports: [
    PrismaClientAdapter,
    BcryptEncrypterServiceAdapter,
    NestJwtServiceAdapter,
  ],
  imports: [
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "20s" },
    }),
  ],
})
export class SharedModule {}
