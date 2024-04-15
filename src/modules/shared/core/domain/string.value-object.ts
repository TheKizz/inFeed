import { ValueObject } from "./value-object.abstract";

interface IPrimitiveStringValueObject {
  value?: string;
}

export class StringValueObject extends ValueObject {
  readonly value: string;

  constructor(value: string) {
    super(false, value);
    this.value = value;
  }

  toPrimitives(): IPrimitiveStringValueObject {
    return {
      value: this.value,
    };
  }
}
