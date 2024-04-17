import { ValueObject } from "./value-object.abstract";

export class BooleanValueObject extends ValueObject {
  readonly value: boolean;

  constructor(value: boolean) {
    super(false, value);
    this.validate(value);
    this.value = value;
  }

  protected validate(value: any): void {
    if (typeof value !== "boolean") {
      throw new Error(`El valor ${value} no es un boolean`);
    }
  }

  toPrimitive(): boolean {
    return this.value;
  }
}
