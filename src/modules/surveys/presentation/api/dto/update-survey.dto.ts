import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { type ISurveyEntityUpdateProps } from "../../../core/domain/entities/survey.entity";
import { BooleanValueObject } from "src/modules/shared/core/domain/boolean.value-object";
import { SurveyParticipationConditionValueObject } from "../../../core/domain/value-objects/survey-participation-condition.value-object";
import { Transform, Type } from "class-transformer";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import { DateValueObject } from "src/modules/shared/core/domain/date.value-object";
import { IsOptional } from "class-validator";

export class UpdateSurveyDto implements ISurveyEntityUpdateProps {
  @IsOptional()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly title?: StringValueObject;

  @IsOptional()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  readonly description?: StringValueObject;

  @IsOptional()
  @Type(() => BooleanValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new BooleanValueObject(value)),
  )
  readonly isPublic?: BooleanValueObject;

  @IsOptional()
  @Type(() => SurveyParticipationConditionValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(
      key,
      () => new SurveyParticipationConditionValueObject(value),
    ),
  )
  readonly participationCondition?: SurveyParticipationConditionValueObject;

  @IsOptional()
  @Type(() => BooleanValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new BooleanValueObject(value)),
  )
  readonly forceToRate?: BooleanValueObject;

  @IsOptional()
  @Type(() => DateValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new DateValueObject(value)),
  )
  readonly startsAt?: DateValueObject;

  @IsOptional()
  @Type(() => DateValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new DateValueObject(value)),
  )
  readonly endsAt?: DateValueObject;
}
