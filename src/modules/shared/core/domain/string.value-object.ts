import { ValueObject } from "./value-object.abstract";

export class StringValueObject extends ValueObject {
  readonly value: string;

  constructor(value: string) {
    super(false, value);
    this.validate(value);
    this.value = value;
  }

  protected validate(value: any): void {
    if (typeof value !== "string") {
      throw new Error(`El valor ${value} no es un string`);
    }
  }

  toPrimitive(): string {
    return this.value;
  }
}
