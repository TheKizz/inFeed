import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { type ISurveyEntityCreationProps } from "../../../core/domain/entities/survey.entity";
import { BooleanValueObject } from "src/modules/shared/core/domain/boolean.value-object";
import { SurveyParticipationConditionValueObject } from "../../../core/domain/value-objects/survey-participation-condition.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import { Transform, Type } from "class-transformer";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import { DateValueObject } from "src/modules/shared/core/domain/date.value-object";
import {
  ArrayNotEmpty,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";

export class CreateSurveyDto implements ISurveyEntityCreationProps {
  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly title: StringValueObject;

  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly description: StringValueObject;

  @IsNotEmpty()
  @Type(() => BooleanValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new BooleanValueObject(value)),
  )
  readonly isPublic: BooleanValueObject;

  @IsNotEmpty()
  @Type(() => SurveyParticipationConditionValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(
      key,
      () => new SurveyParticipationConditionValueObject(value),
    ),
  )
  readonly participationCondition: SurveyParticipationConditionValueObject;

  @IsNotEmpty()
  @Type(() => BooleanValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new BooleanValueObject(value)),
  )
  readonly forceToRate: BooleanValueObject;

  @IsNotEmpty()
  @Type(() => DateValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new DateValueObject(value)),
  )
  readonly startsAt: DateValueObject;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => DateValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new DateValueObject(value)),
  )
  readonly endsAt?: DateValueObject;

  @IsEmpty()
  creatorId: UUIDValueObject;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateQuestionDto)
  @ValidateNested({ each: true })
  readonly questions?: CreateQuestionDto[];
}
