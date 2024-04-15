import { ValueObject } from "./value-object.abstract";

export class NumberValueObject extends ValueObject {
  readonly value: boolean;

  constructor(value: boolean) {
    super(false, value);
    this.value = value;
  }
}
