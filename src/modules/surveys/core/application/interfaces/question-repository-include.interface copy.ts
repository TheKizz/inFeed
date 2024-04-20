import { type IQuestionEntityProps } from "../../domain/entities/question.entity";

export interface IQuestionRepositoryInclude
  extends Partial<IQuestionPropertiesToInclude> {}

interface IQuestionPropertiesToInclude
  extends Record<
    string extends QuestionPropertiesNameToInclude
      ? never
      : QuestionPropertiesNameToInclude,
    boolean
  > {}

type QuestionPropertiesNameToInclude = keyof Pick<
  IQuestionEntityProps,
  "answerOptions"
>;
