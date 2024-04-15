import { type PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { type IUserRepositoryPort } from "src/modules/user-access/core/application/ports/exit/user-repository.port";
import {
  type IPrimitiveUserEntity,
  type UserEntity,
} from "src/modules/user-access/core/domain/entities/user.entity";

export class PrismaUserRepositoryAdapter implements IUserRepositoryPort {
  constructor(private readonly prismaClient: PrismaClientAdapter) {}

  async save(user: UserEntity): Promise<void> {
    const primitiveUserEntity: IPrimitiveUserEntity = user.toPrimitive();
    await this.prismaClient.user.upsert({
      create: primitiveUserEntity,
      update: primitiveUserEntity,
      where: {
        id: primitiveUserEntity.id,
      },
    });
  }
}
