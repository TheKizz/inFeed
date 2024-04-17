import { ValueObject } from "./value-object.abstract";

export class DateValueObject extends ValueObject {
  private readonly value: Date;

  constructor(value: string | Date, minDate?: Date, maxDate?: Date) {
    super(false, value);
    this.validate(new Date(value), minDate, maxDate);
    this.value = new Date(value);
  }

  protected validate(value: any, minDate?: Date, maxDate?: Date): void {
    if (!(value instanceof Date)) {
      throw new Error("El valor debe ser una instancia de Date.");
    }
    if (minDate && value < minDate) {
      throw new Error(
        `El valor debe ser mayor o igual a ${minDate.toISOString()}`,
      );
    }
    if (maxDate && value > maxDate) {
      throw new Error(
        `El valor debe ser menor o igual a ${maxDate.toISOString()}`,
      );
    }
  }

  toPrimitive(): Date {
    return this.value;
  }

  get year(): number {
    return this.value.getFullYear();
  }

  get month(): number {
    return this.value.getMonth() + 1;
  }

  get day(): number {
    return this.value.getDate();
  }

  get hour(): number {
    return this.value.getHours();
  }

  get minute(): number {
    return this.value.getMinutes();
  }

  get second(): number {
    return this.value.getSeconds();
  }

  toString(): string {
    return this.value.toISOString();
  }
}
