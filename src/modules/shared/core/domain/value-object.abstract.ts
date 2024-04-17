import { objectDeepEqual } from "./utils";

export abstract class ValueObject {
  constructor(isOptional: boolean = false, ...values: unknown[]) {
    if (!isOptional) {
      this.validateNotOptionalValues(...values);
    }
  }

  protected validateNotOptionalValues(...values: unknown[]): void {
    for (const value of values) {
      if (value === null || value === undefined) {
        throw new Error(`El valor no puede ser null o undefined`);
      }
    }
  }

  equals(value: any): boolean {
    return objectDeepEqual(this, value);
  }

  toString(): string {
    return JSON.stringify(this);
  }

  protected abstract validate(...args: any[]): void;
  abstract toPrimitive(): unknown;
}
