import { BooleanValueObject } from "src/modules/shared/core/domain/boolean.value-object";
import { Entity } from "src/modules/shared/core/domain/entity.abstract";
import { type StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";

export interface IUserEntityProps
  extends Pick<
    UserEntity,
    "id" | "username" | "password" | "email" | "isOnline"
  > {}

export interface IUserEntityCreationProps
  extends Pick<IUserEntityProps, "username" | "password" | "email"> {}

type UserEntityPropsName = keyof IUserEntityProps;

export class UserEntity extends Entity<StringValueObject> {
  readonly username: StringValueObject;
  readonly password: StringValueObject;
  readonly email: StringValueObject;
  readonly isOnline: BooleanValueObject;
  // TODO: Add other properties

  constructor(props: IUserEntityProps) {
    super(props.id);
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
    this.isOnline = props.isOnline;
  }

  create(props: IUserEntityCreationProps): UserEntity {
    return new UserEntity({
      id: new UUIDValueObject(crypto.randomUUID()),
      isOnline: new BooleanValueObject(false),
      ...props,
    });
  }

  clone(props: IUserEntityProps): UserEntity {
    return new UserEntity(props);
  }

  toPrimitive(): Record<UserEntityPropsName, unknown> {
    return this.getPrimitiveEntity<UserEntityPropsName>();
  }
}
