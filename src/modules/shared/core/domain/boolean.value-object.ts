import { ValueObject } from "./value-object.abstract";

export class NumberValueObject extends ValueObject {
  protected readonly value?: boolean;

  constructor(value?: boolean, isOptional: boolean = false) {
    super(isOptional, value);
    this.value = value;
  }
}
