import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { Transform, Type } from "class-transformer";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import { IsNotEmpty } from "class-validator";
import { type IAnswerOptionEntityUpdateProps } from "src/modules/surveys/core/domain/entities/answer-option.entity";

export class UpdateAnswerOptionDto implements IAnswerOptionEntityUpdateProps {
  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly description?: StringValueObject;
}
