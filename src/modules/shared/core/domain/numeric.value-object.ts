import { ValueObject } from "./value-object.abstract";

export class NumericValueObject extends ValueObject {
  readonly value: number;

  constructor(value: number) {
    super(false, value);
    this.value = value;
  }

  toPrimitive(): number {
    return this.value;
  }
}
