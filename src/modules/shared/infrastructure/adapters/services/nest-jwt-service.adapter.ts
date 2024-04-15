/* eslint-disable @typescript-eslint/return-await */
import { type JwtService } from "@nestjs/jwt";
import {
  type ISignOptions,
  type IVerifyOptions,
  type IJwtService,
} from "src/modules/shared/core/application/jwt-service.interface";

export class NestJwtServiceAdapter implements IJwtService {
  constructor(private readonly nestJwtService: JwtService) {}

  async sign<PayloadType extends object>(
    payload: PayloadType,
    options?: ISignOptions,
  ): Promise<string> {
    return await this.nestJwtService.signAsync(payload, options);
  }

  async verify<PayloadType>(
    token: string,
    options?: IVerifyOptions,
  ): Promise<PayloadType> {
    return (await this.nestJwtService.verifyAsync(
      token,
      options,
    )) as PayloadType;
  }
}
