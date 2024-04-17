import { Module } from "@nestjs/common";
import { SearchSurveysUseCase } from "../../core/application/use-cases/search-surveys.use-case";
import { type ISurveyRepositoryPort } from "../../core/application/ports/exit/survey-repository.port";
import { SurveyController } from "../../presentation/api/controllers/survey.controller";
import { PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { PrismaSurveyRepositoryAdapter } from "../adapters/repositories/prisma-survey-repository.adapter";
import { SurveyService } from "../../core/application/services/survey.service";
import { CreateSurveyUseCase } from "../../core/application/use-cases/create-survey.use-case";

@Module({
  providers: [
    // Repositories
    {
      provide: PrismaSurveyRepositoryAdapter,
      useFactory: (prismaClient: PrismaClientAdapter) => {
        return new PrismaSurveyRepositoryAdapter(prismaClient);
      },
      inject: [PrismaClientAdapter],
    },
    // Use Cases
    {
      provide: SearchSurveysUseCase,
      useFactory: (repository: ISurveyRepositoryPort) =>
        new SearchSurveysUseCase(repository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    {
      provide: CreateSurveyUseCase,
      useFactory: (repository: ISurveyRepositoryPort) =>
        new CreateSurveyUseCase(repository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    // Services
    {
      provide: SurveyService,
      useFactory: (
        searchSurveyUseCase: SearchSurveysUseCase,
        createSurveyUseCase: CreateSurveyUseCase,
      ) => new SurveyService(searchSurveyUseCase, createSurveyUseCase),
      inject: [SearchSurveysUseCase, CreateSurveyUseCase],
    },
  ],
  controllers: [SurveyController],
})
export class SurveyModule {}
