import { EnumValueObject } from "src/modules/shared/core/domain/enum.value-object";

export enum QuestionType {
  SINGLE = "SINGLE",
  MULTIPLE = "MULTIPLE",
  TEXT = "TEXT",
  DATE = "DATE",
}

export class QuestionTypeValueObject extends EnumValueObject<string> {
  constructor(value: QuestionType) {
    super(Object.values(QuestionType), value);
  }

  static readonly SINGLE = new QuestionTypeValueObject(QuestionType.SINGLE);

  static readonly MULTIPLE = new QuestionTypeValueObject(QuestionType.MULTIPLE);

  static readonly TEXT = new QuestionTypeValueObject(QuestionType.TEXT);

  static readonly DATE = new QuestionTypeValueObject(QuestionType.DATE);
}
