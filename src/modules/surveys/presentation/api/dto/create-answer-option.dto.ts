import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { Transform, Type } from "class-transformer";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import { IsEmpty, IsNotEmpty } from "class-validator";
import { type IAnswerOptionEntityCreationProps } from "src/modules/surveys/core/domain/entities/answer-option.entity";

export class CreateAnswerOptionDto implements IAnswerOptionEntityCreationProps {
  @IsEmpty()
  questionId: UUIDValueObject;

  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly description: StringValueObject;
}
