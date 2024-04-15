import { ValueObject } from "./value-object.abstract";

export class NumberValueObject extends ValueObject {
  readonly value: number;

  constructor(value: number) {
    super(false, value);
    this.value = value;
  }
}
