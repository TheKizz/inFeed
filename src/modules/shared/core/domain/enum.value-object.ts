import { ValueObject } from "./value-object.abstract";

export class EnumValueObject<
  ValuesType extends string | number | symbol,
> extends ValueObject {
  readonly value: ValuesType;
  readonly acceptedValues: Set<ValuesType>;

  constructor(acceptedValues: ValuesType[], value: ValuesType) {
    super(false, value);
    this.acceptedValues = new Set(acceptedValues);
    this.validateValue(value);
    this.value = value;
  }

  validateValue(value: any): void {
    if (!this.acceptedValues.has(value)) {
      throw new Error(`El valor ${value} no es aceptado`);
    }
  }

  toPrimitive(): unknown {
    return this.value;
  }
}
