import { Transform, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { ValueObjectValidationWrapper } from "src/modules/shared/presentation/utils/value-object-validation-wrapper.util";
import { type ILoginUserProps } from "src/modules/user-access/core/application/interfaces/login-user.interface";

export class LoginUserDto implements ILoginUserProps {
  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  email: StringValueObject;

  @IsNotEmpty()
  @Type(() => StringValueObject)
  @Transform(({ key, value }) =>
    ValueObjectValidationWrapper(key, () => new StringValueObject(value)),
  )
  password: StringValueObject;
}
