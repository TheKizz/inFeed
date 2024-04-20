import { Module } from "@nestjs/common";
import { PrismaClientAdapter } from "src/modules/shared/infrastructure/clients/prisma.client";
import { type ISurveyRepositoryPort } from "../../core/application/ports/exit/survey-repository.port";
import { SurveyService } from "../../core/application/services/survey.service";
import { CreateQuestionUseCase } from "../../core/application/use-cases/create-question.use-case";
import { CreateSurveyUseCase } from "../../core/application/use-cases/create-survey.use-case";
import { DeleteSurveyUseCase } from "../../core/application/use-cases/delete-survey.use-case";
import { FindSurveyByIdUseCase } from "../../core/application/use-cases/find-survey-by-id.use-case";
import { SearchSurveysUseCase } from "../../core/application/use-cases/search-surveys.use-case";
import { UpdateQuestionByIdUseCase } from "../../core/application/use-cases/update-question-by-id.use-case";
import { UpdateSurveyUseCase } from "../../core/application/use-cases/update-survey.use-case";
import { SurveyController } from "../../presentation/api/controllers/survey.controller";
import { PrismaSurveyRepositoryAdapter } from "../adapters/repositories/prisma-survey-repository.adapter";
import { DeleteQuestionByIdUseCase } from "../../core/application/use-cases/delete-question-by-id.use-case";
import { CreateAnswerOptionUseCase } from "../../core/application/use-cases/create-answer-option.use-case";
import { UpdateAnswerOptionByIdUseCase } from "../../core/application/use-cases/update-answer-option-by-id.use-case";
import { DeleteAnswerOptionByIdUseCase } from "../../core/application/use-cases/delete-answer-option-by-id.use-case";

@Module({
  providers: [
    // REPOSITORIES
    {
      provide: PrismaSurveyRepositoryAdapter,
      useFactory: (prismaClient: PrismaClientAdapter) => {
        return new PrismaSurveyRepositoryAdapter(prismaClient);
      },
      inject: [PrismaClientAdapter],
    },
    // USE CASES
    // Survey
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
    {
      provide: FindSurveyByIdUseCase,
      useFactory: (repository: ISurveyRepositoryPort) =>
        new FindSurveyByIdUseCase(repository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    {
      provide: UpdateSurveyUseCase,
      useFactory: (repository: ISurveyRepositoryPort) =>
        new UpdateSurveyUseCase(repository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    {
      provide: DeleteSurveyUseCase,
      useFactory: (surveyRepository: ISurveyRepositoryPort) =>
        new DeleteSurveyUseCase(surveyRepository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    // Question
    {
      provide: CreateQuestionUseCase,
      useFactory: (surveyRepository: ISurveyRepositoryPort) =>
        new CreateQuestionUseCase(surveyRepository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    {
      provide: UpdateQuestionByIdUseCase,
      useFactory: (surveyRepository: ISurveyRepositoryPort) =>
        new UpdateQuestionByIdUseCase(surveyRepository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    {
      provide: DeleteQuestionByIdUseCase,
      useFactory: (surveyRepository: ISurveyRepositoryPort) =>
        new DeleteQuestionByIdUseCase(surveyRepository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    // Answer
    {
      provide: CreateAnswerOptionUseCase,
      useFactory: (surveyRepository: ISurveyRepositoryPort) =>
        new CreateAnswerOptionUseCase(surveyRepository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    {
      provide: UpdateAnswerOptionByIdUseCase,
      useFactory: (surveyRepository: ISurveyRepositoryPort) =>
        new UpdateAnswerOptionByIdUseCase(surveyRepository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    {
      provide: DeleteAnswerOptionByIdUseCase,
      useFactory: (surveyRepository: ISurveyRepositoryPort) =>
        new DeleteAnswerOptionByIdUseCase(surveyRepository),
      inject: [PrismaSurveyRepositoryAdapter],
    },
    // SERVICES
    {
      provide: SurveyService,
      useFactory: (
        searchSurveyUseCase: SearchSurveysUseCase,
        createSurveyUseCase: CreateSurveyUseCase,
        findSurveyByIdUseCase: FindSurveyByIdUseCase,
        updateSurveyUseCase: UpdateSurveyUseCase,
        deleteSurveyUseCase: DeleteSurveyUseCase,
        createQuestionUseCase: CreateQuestionUseCase,
        updateQuestionByIdUseCase: UpdateQuestionByIdUseCase,
        deleteQuestionByIdUseCase: DeleteQuestionByIdUseCase,
        createAnswerOptionUseCase: CreateAnswerOptionUseCase,
        updateAnswerOptionByIdUseCase: UpdateAnswerOptionByIdUseCase,
        deleteAnswerOptionByIdUseCase: DeleteAnswerOptionByIdUseCase,
      ) =>
        new SurveyService(
          searchSurveyUseCase,
          createSurveyUseCase,
          findSurveyByIdUseCase,
          updateSurveyUseCase,
          deleteSurveyUseCase,
          createQuestionUseCase,
          updateQuestionByIdUseCase,
          deleteQuestionByIdUseCase,
          createAnswerOptionUseCase,
          updateAnswerOptionByIdUseCase,
          deleteAnswerOptionByIdUseCase,
        ),
      inject: [
        SearchSurveysUseCase,
        CreateSurveyUseCase,
        FindSurveyByIdUseCase,
        UpdateSurveyUseCase,
        DeleteSurveyUseCase,
        CreateQuestionUseCase,
        UpdateQuestionByIdUseCase,
        DeleteQuestionByIdUseCase,
        CreateAnswerOptionUseCase,
        UpdateAnswerOptionByIdUseCase,
        DeleteAnswerOptionByIdUseCase,
      ],
    },
  ],
  controllers: [SurveyController],
})
export class SurveyModule {}
