import { ValueObject } from "./value-object.abstract";

export class NumericValueObject extends ValueObject {
  readonly value: number;

  constructor(value: number) {
    super(false, value);
    this.validate(value);
    this.value = value;
  }

  protected validate(value: any): void {
    if (typeof value !== "number") {
      throw new Error(`El valor ${value} no es un number`);
    }
  }

  toPrimitive(): number {
    return this.value;
  }
}
