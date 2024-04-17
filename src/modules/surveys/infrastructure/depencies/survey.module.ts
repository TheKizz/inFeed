import { Module } from "@nestjs/common";
import { SearchSurveysUseCase } from "../../core/application/use-cases/search-surveys.use-case";
import { type ISurveyRepositoryPort } from "../../core/application/ports/exit/survey-repository.port";
import { SurveyController } from "../../core/presentation/api/controllers/survey.controller";
import { PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { PrismaSurveyRepositoryAdapter } from "../adapters/repositories/prisma-survey-repository.adapter";
import { SurveyService } from "../../core/application/services/survey.service";

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
      provide: SurveyService,
      useFactory: (useCase: SearchSurveysUseCase) => new SurveyService(useCase),
      inject: [SearchSurveysUseCase],
    },
  ],
  controllers: [SurveyController],
})
export class SurveyModule {}
