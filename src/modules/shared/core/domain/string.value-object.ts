import { ValueObject } from "./value-object.abstract";

interface IPrimitiveStringValueObject {
  value?: string;
}

export class StringValueObject extends ValueObject {
  protected readonly value?: string;

  constructor(value?: string, isOptional: boolean = false) {
    super(isOptional, value);
    this.value = value;
  }

  toPrimitives(): IPrimitiveStringValueObject {
    return {
      value: this.value,
    };
  }
}
