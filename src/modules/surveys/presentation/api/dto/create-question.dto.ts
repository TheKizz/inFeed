import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { Transform, Type } from "class-transformer";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import {
  ArrayNotEmpty,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { type IQuestionEntityCreationProps } from "src/modules/surveys/core/domain/entities/question.entity";
import { QuestionTypeValueObject } from "src/modules/surveys/core/domain/value-objects/question-type.value-object";
import { CreateAnswerOptionDto } from "./create-answer-option.dto";

export class CreateQuestionDto implements IQuestionEntityCreationProps {
  @IsEmpty()
  surveyId: UUIDValueObject;

  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly description: StringValueObject;

  @IsNotEmpty()
  @Type(() => QuestionTypeValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new QuestionTypeValueObject(value)),
  )
  readonly type: QuestionTypeValueObject;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateAnswerOptionDto)
  @ValidateNested({ each: true })
  readonly answerOptions?: CreateAnswerOptionDto[];
}
