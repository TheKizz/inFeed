import {
  type QuestionEntity,
  type IPrimitiveQuestionEntity,
} from "./../../../core/domain/entities/question.entity";
import { PaginatedRepository } from "src/modules/shared/core/application/paginated-repository.abstract";
import { type IPaginatedResult } from "src/modules/shared/core/application/paginated-result.interface";
import { type IQuery } from "src/modules/shared/core/application/query.interface";
import { type UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { type PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { type ISurveyRepositoryInclude } from "src/modules/surveys/core/application/interfaces/survey-repository-include.interface";
import { type ISurveyRepositoryPort } from "src/modules/surveys/core/application/ports/exit/survey-repository.port";
import {
  type AnswerOptionEntity,
  type IPrimitiveAnswerOptionEntity,
} from "src/modules/surveys/core/domain/entities/answer-option.entity";
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
    includes?: ISurveyRepositoryInclude,
  ): Promise<IPaginatedResult<UUIDValueObject, SurveyEntity>> {
    const booleanValues: string[] = ["true", "false"];
    const [surveys, totalElements] = await this.prismaClient.$transaction([
      this.prismaClient.survey.findMany({
        where: {
          OR: [
            {
              id: {
                equals: query?.search,
              },
            },
            {
              title: {
                contains: query?.search,
              },
            },
            {
              description: {
                contains: query?.search,
              },
            },
            {
              isPublic: booleanValues.includes(
                query?.search?.toLocaleLowerCase(),
              )
                ? {
                    equals: Boolean(query?.search),
                  }
                : undefined,
            },
            {
              participationCondition: Object.values(
                SurveyParticipationCondition,
              ).some(
                (value: SurveyParticipationCondition) =>
                  query?.search === value,
              )
                ? {
                    equals: query?.search as SurveyParticipationCondition,
                  }
                : undefined,
            },
            {
              forceToRate: booleanValues.includes(
                query?.search?.toLocaleLowerCase(),
              )
                ? {
                    equals: Boolean(query?.search),
                  }
                : undefined,
            },
            {
              rating:
                !isNaN(parseFloat(query?.search)) &&
                !isNaN(Number(query?.search))
                  ? {
                      equals: Number(query?.search),
                    }
                  : undefined,
            },
            {
              creatorId: {
                equals: query?.search,
              },
            },
            {
              creator: {
                OR: [
                  {
                    username: {
                      contains: query?.search,
                    },
                  },
                  {
                    email: {
                      contains: query?.search,
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
        include: includes,
      }),
      this.prismaClient.survey.count({
        where: {
          OR: [
            {
              id: {
                equals: query?.search,
              },
            },
            {
              title: {
                contains: query?.search,
              },
            },
            {
              description: {
                contains: query?.search,
              },
            },
            {
              isPublic: booleanValues.includes(
                query?.search?.toLocaleLowerCase(),
              )
                ? {
                    equals: Boolean(query?.search),
                  }
                : undefined,
            },
            {
              participationCondition: Object.values(
                SurveyParticipationCondition,
              ).some(
                (value: SurveyParticipationCondition) =>
                  query?.search === value,
              )
                ? {
                    equals: query?.search as SurveyParticipationCondition,
                  }
                : undefined,
            },
            {
              forceToRate: booleanValues.includes(
                query?.search?.toLocaleLowerCase(),
              )
                ? {
                    equals: Boolean(query?.search),
                  }
                : undefined,
            },
            {
              rating:
                !isNaN(parseFloat(query?.search)) &&
                !isNaN(Number(query?.search))
                  ? {
                      equals: Number(query?.search),
                    }
                  : undefined,
            },
            {
              creatorId: {
                equals: query?.search,
              },
            },
            {
              creator: {
                OR: [
                  {
                    username: {
                      contains: query?.search,
                    },
                  },
                  {
                    email: {
                      contains: query?.search,
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
    const { questions, ...rest } = primitiveUserEntity;
    await this.prismaClient.survey.upsert({
      create: rest,
      update: rest,
      where: {
        id: rest.id,
      },
    });
    Promise.all(
      surveyEntity.questions.map(async (question) => {
        await this.saveQuestion(question);
      }),
    ).catch((err) => {
      throw err;
    });
  }

  async delete(surveyEntity: SurveyEntity): Promise<void> {
    await this.prismaClient.survey.delete({
      where: {
        id: surveyEntity.id.toPrimitive(),
      },
    });
  }

  async saveQuestion(questionToSave: QuestionEntity): Promise<void> {
    const primitiveQuestionEntity: IPrimitiveQuestionEntity =
      questionToSave.toPrimitive();
    const { answerOptions, ...rest } = primitiveQuestionEntity;
    await this.prismaClient.question.upsert({
      create: rest,
      update: {
        ...rest,
        answerOptions: answerOptions?.length
          ? {
              deleteMany: {},
            }
          : undefined,
      },
      where: {
        id: rest.id,
      },
    });
    Promise.all(
      questionToSave.answerOptions.map(async (answerOption) => {
        await this.saveAnswerOption(answerOption);
      }),
    ).catch((err) => {
      throw err;
    });
  }

  async deleteQuestion(questionToDelete: QuestionEntity): Promise<void> {
    await this.prismaClient.question.delete({
      where: {
        id: questionToDelete.id.toPrimitive(),
      },
    });
  }

  async saveAnswerOption(
    answerOptionEntity: AnswerOptionEntity,
  ): Promise<void> {
    const primitiveAnswerOptionEntity: IPrimitiveAnswerOptionEntity =
      answerOptionEntity.toPrimitive();
    await this.prismaClient.answerOption.upsert({
      create: primitiveAnswerOptionEntity,
      update: primitiveAnswerOptionEntity,
      where: {
        id: primitiveAnswerOptionEntity.id,
      },
    });
  }

  async deleteAnswerOption(
    answerOptionToDelete: AnswerOptionEntity,
  ): Promise<void> {
    await this.prismaClient.answerOption.delete({
      where: {
        id: answerOptionToDelete.id.toPrimitive(),
      },
    });
  }
}
