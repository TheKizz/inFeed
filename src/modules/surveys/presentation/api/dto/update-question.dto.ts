import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { Transform, Type } from "class-transformer";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import { IsNotEmpty, IsOptional } from "class-validator";
import { type IQuestionEntityUpdateProps } from "src/modules/surveys/core/domain/entities/question.entity";
import { QuestionTypeValueObject } from "src/modules/surveys/core/domain/value-objects/question-type.value-object";

export class UpdateQuestionDto implements IQuestionEntityUpdateProps {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly description?: StringValueObject;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => QuestionTypeValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new QuestionTypeValueObject(value)),
  )
  readonly type?: QuestionTypeValueObject;
}
