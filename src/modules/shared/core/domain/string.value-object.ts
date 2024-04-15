import { ValueObject } from "./value-object.abstract";

export class StringValueObject extends ValueObject {
  readonly value: string;

  constructor(value: string) {
    super(false, value);
    this.value = value;
  }
}
