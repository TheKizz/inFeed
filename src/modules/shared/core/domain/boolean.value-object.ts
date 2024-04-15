import { ValueObject } from "./value-object.abstract";

export class BooleanValueObject extends ValueObject {
  readonly value: boolean;

  constructor(value: boolean) {
    super(false, value);
    this.value = value;
  }

  toPrimitive(): boolean {
    return this.value;
  }
}
