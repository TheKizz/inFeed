import { ValueObject } from "./value-object.abstract";

export class NumberValueObject extends ValueObject {
  protected readonly value?: number;

  constructor(value?: number, isOptional: boolean = false) {
    super(isOptional, value);
    this.value = value;
  }
}
