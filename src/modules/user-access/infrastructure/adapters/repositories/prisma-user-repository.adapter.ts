import { PaginatedRepository } from "src/modules/shared/core/application/paginated-repository.abstract";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { type IUserRepositoryPort } from "src/modules/user-access/core/application/ports/exit/user-repository.port";
import {
  UserEntity,
  type IPrimitiveUserEntity,
} from "src/modules/user-access/core/domain/entities/user.entity";

export class PrismaUserRepositoryAdapter
  extends PaginatedRepository<UUIDValueObject, UserEntity>
  implements IUserRepositoryPort
{
  constructor(private readonly prismaClient: PrismaClientAdapter) {
    super();
  }

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

  async search(
    query: IQuery<UUIDValueObject>,
  ): Promise<IPaginatedResult<UUIDValueObject, UserEntity>> {
    const [users, totalElements]: [IPrimitiveUserEntity[], number] =
      await this.prismaClient.$transaction([
        this.prismaClient.user.findMany({
          where: {
            OR: [
              {
                id: {
                  equals: query.search,
                },
              },
              {
                email: {
                  contains: query.search,
                },
              },
              {
                username: {
                  contains: query.search,
                },
              },
              {
                isOnline: {
                  equals:
                    typeof query.search === "boolean"
                      ? query.search
                      : undefined,
                },
              },
            ],
          },
          cursor: query?.lastElementId
            ? {
                id: query?.lastElementId?.toPrimitive(),
              }
            : undefined,
          skip: query?.lastElementId ? 1 : 0,
          take: query.elementsPerPage,
        }),
        this.prismaClient.user.count({
          where: {
            OR: [
              {
                id: {
                  equals: query.search,
                },
              },
              {
                email: {
                  contains: query.search,
                },
              },
              {
                username: {
                  contains: query.search,
                },
              },
              {
                isOnline: {
                  equals:
                    typeof query.search === "boolean"
                      ? query.search
                      : undefined,
                },
              },
            ],
          },
          cursor: query?.lastElementId
            ? {
                id: query?.lastElementId?.toPrimitive(),
              }
            : undefined,
          skip: query?.lastElementId ? 1 : 0,
          take: query.elementsPerPage,
        }),
      ]);
    const userEntities: UserEntity[] = users.map((user) =>
      UserEntity.fromPrimitive(user),
    );
    const paginatedResult: IPaginatedResult<UUIDValueObject, UserEntity> =
      this.buildPaginatedResult(query, userEntities, totalElements);
    return paginatedResult;
  }
}
