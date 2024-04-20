import { type ISurveyEntityProps } from "../../domain/entities/survey.entity";
import { type IQuestionRepositoryInclude } from "./question-repository-include.interface copy";
import { type IRepositorySubInclude } from "./repository-sub-include.interface";

export interface ISurveyRepositoryInclude
  extends Partial<ISurveyPropertiesToInclude> {}

interface ISurveyPropertiesToInclude
  extends Record<
    string extends SurveyPropertiesNameToInclude
      ? never
      : SurveyPropertiesNameToInclude,
    boolean | IRepositorySubInclude<IQuestionRepositoryInclude>
  > {}

type SurveyPropertiesNameToInclude = keyof Pick<
  ISurveyEntityProps,
  "questions"
>;
