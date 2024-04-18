import { BooleanValueObject } from "src/modules/shared/core/domain/boolean.value-object";
import {
  Entity,
  type PrimitiveEntity,
} from "src/modules/shared/core/domain/entity.abstract";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";

export interface IUserEntityProps
  extends Pick<
    UserEntity,
    "id" | "username" | "password" | "email" | "isOnline"
  > {}

export interface IUserEntityCreationProps
  extends Pick<IUserEntityProps, "username" | "password" | "email"> {}

export interface IPrimitiveUserEntity extends PrimitiveEntity<string> {
  username: string;
  password: string;
  email: string;
  isOnline: boolean;
}

export class UserEntity extends Entity<UUIDValueObject> {
  private _username: StringValueObject;
  private _password: StringValueObject;
  private _email: StringValueObject;
  private _isOnline: BooleanValueObject;
  // TODO: Add other properties

  constructor(props: IUserEntityProps) {
    const { id, username, password, email, isOnline } = props;
    super(id);
    this._username = username;
    this._password = password;
    this._email = email;
    this._isOnline = isOnline;
  }

  static create(props: IUserEntityCreationProps): UserEntity {
    return new UserEntity({
      id: new UUIDValueObject(crypto.randomUUID()),
      isOnline: new BooleanValueObject(true),
      ...props,
    });
  }

  static fromPrimitive(props: IPrimitiveUserEntity): UserEntity {
    const { id, username, password, email, isOnline } = props;
    const userEntityProps: IUserEntityProps = {
      id: new UUIDValueObject(id),
      username: new StringValueObject(username),
      password: new StringValueObject(password),
      email: new StringValueObject(email),
      isOnline: new BooleanValueObject(isOnline),
    };
    return new UserEntity(userEntityProps);
  }

  toPrimitive(): IPrimitiveUserEntity {
    return this.getPrimitiveEntity<IPrimitiveUserEntity>();
  }

  establishIsOnline(): void {
    this._isOnline = new BooleanValueObject(true);
  }

  establishIsOffline(): void {
    this._isOnline = new BooleanValueObject(false);
  }

  get username(): StringValueObject {
    return this._username;
  }

  get password(): StringValueObject {
    return this._password;
  }

  get email(): StringValueObject {
    return this._email;
  }

  get isOnline(): BooleanValueObject {
    return this._isOnline;
  }
}
