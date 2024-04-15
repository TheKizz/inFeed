import { Transform, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import { type IRegisterUserProps } from "src/modules/user-access/core/application/interfaces/register-user.interface";

export class RegisterUserDto implements IRegisterUserProps {
  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  username: StringValueObject;

  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  password: StringValueObject;

  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  email: StringValueObject;
}
