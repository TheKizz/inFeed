import { PaginatedRepository } from "src/modules/shared/core/application/paginated-repository.abstract";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { type ISurveyRepositoryPort } from "src/modules/surveys/core/application/ports/exit/survey-repository.port";
import {
  type IPrimitiveSurveyEntity,
  SurveyEntity,
} from "src/modules/surveys/core/domain/entities/survey.entity";
import { SurveyParticipationCondition } from "src/modules/surveys/core/domain/value-objects/survey-participation-condition.value-object";

export class PrismaSurveyRepositoryAdapter
  extends PaginatedRepository<UUIDValueObject, SurveyEntity>
  implements ISurveyRepositoryPort
{
  constructor(private readonly prismaClient: PrismaClientAdapter) {
    super();
  }

  async search(
    query: IQuery<UUIDValueObject>,
  ): Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>> {
    const booleanValues: string[] = ["true", "false"];
    const [surveys, totalElements] = await this.prismaClient.$transaction([
      this.prismaClient.survey.findMany({
        where: {
          OR: [
            {
              id: {
                equals: query.search,
              },
            },
            {
              title: {
                contains: query.search,
              },
            },
            {
              description: {
                contains: query.search,
              },
            },
            {
              isPublic: booleanValues.includes(query.search.toLocaleLowerCase())
                ? {
                    equals: Boolean(query.search),
                  }
                : undefined,
            },
            {
              participationCondition: Object.values(
                SurveyParticipationCondition,
              ).some(
                (value: SurveyParticipationCondition) => query.search === value,
              )
                ? {
                    equals: query.search as SurveyParticipationCondition,
                  }
                : undefined,
            },
            {
              forceToRate: booleanValues.includes(
                query.search.toLocaleLowerCase(),
              )
                ? {
                    equals: Boolean(query.search),
                  }
                : undefined,
            },
            {
              rating:
                !isNaN(parseFloat(query.search)) && !isNaN(Number(query.search))
                  ? {
                      equals: Number(query.search),
                    }
                  : undefined,
            },
            {
              creatorId: {
                equals: query.search,
              },
            },
            {
              creator: {
                OR: [
                  {
                    username: {
                      contains: query.search,
                    },
                  },
                  {
                    email: {
                      contains: query.search,
                    },
                  },
                ],
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
      this.prismaClient.survey.count({
        where: {
          OR: [
            {
              id: {
                equals: query.search,
              },
            },
            {
              title: {
                contains: query.search,
              },
            },
            {
              description: {
                contains: query.search,
              },
            },
            {
              isPublic: booleanValues.includes(query.search.toLocaleLowerCase())
                ? {
                    equals: Boolean(query.search),
                  }
                : undefined,
            },
            {
              participationCondition: Object.values(
                SurveyParticipationCondition,
              ).some(
                (value: SurveyParticipationCondition) => query.search === value,
              )
                ? {
                    equals: query.search as SurveyParticipationCondition,
                  }
                : undefined,
            },
            {
              forceToRate: booleanValues.includes(
                query.search.toLocaleLowerCase(),
              )
                ? {
                    equals: Boolean(query.search),
                  }
                : undefined,
            },
            {
              rating:
                !isNaN(parseFloat(query.search)) && !isNaN(Number(query.search))
                  ? {
                      equals: Number(query.search),
                    }
                  : undefined,
            },
            {
              creatorId: {
                equals: query.search,
              },
            },
            {
              creator: {
                OR: [
                  {
                    username: {
                      contains: query.search,
                    },
                  },
                  {
                    email: {
                      contains: query.search,
                    },
                  },
                ],
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
    const surveyEntities: SurveyEntity[] = (
      surveys as IPrimitiveSurveyEntity[]
    ).map((survey) => SurveyEntity.fromPrimitive(survey));
    const paginatedResult: IPaginatedResult<UUIDValueObject, SurveyEntity> =
      this.buildPaginatedResult(query, surveyEntities, totalElements);
    return paginatedResult;
  }

  async save(surveyEntity: SurveyEntity): Promise<void> {
    const primitiveUserEntity: IPrimitiveSurveyEntity =
      surveyEntity.toPrimitive();
    await this.prismaClient.survey.upsert({
      create: primitiveUserEntity,
      update: primitiveUserEntity,
      where: {
        id: primitiveUserEntity.id,
      },
    });
  }
}
