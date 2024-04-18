import { type ISurveyEntityProps } from "../../domain/entities/survey.entity";

type SurveyPropertiesNameToInclude = keyof Pick<
  ISurveyEntityProps,
  "questions"
>;
interface ISurveyPropertiesToInclude
  extends Record<
    string extends SurveyPropertiesNameToInclude
      ? never
      : SurveyPropertiesNameToInclude,
    boolean
  > {}

export interface ISurveyRepositoryIncludes
  extends Partial<ISurveyPropertiesToInclude> {}
