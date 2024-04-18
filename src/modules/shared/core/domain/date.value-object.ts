import { ValueObject } from "./value-object.abstract";

export class DateValueObject extends ValueObject {
  private readonly value: Date;

  constructor(value: string | Date, minDate?: Date, maxDate?: Date) {
    super(false, value);
    const valueDate: Date = new Date(value);
    this.validate(valueDate, minDate, maxDate);
    this.value = valueDate;
  }

  protected validate(value: any, minDate?: Date, maxDate?: Date): void {
    if (!(value instanceof Date)) {
      throw new Error(
        `El valor de ${DateValueObject.name} debe ser una instancia de Date.`,
      );
    }
    if (isNaN(value.getTime())) {
      throw new Error(
        `El valor de ${DateValueObject.name} no es una fecha válida.`,
      );
    }
    if (minDate && value < minDate) {
      throw new Error(
        `El valor de ${DateValueObject.name}  debe ser mayor o igual a ${minDate.toISOString()}`,
      );
    }
    if (maxDate && value > maxDate) {
      throw new Error(
        `El valor de ${DateValueObject.name}  debe ser menor o igual a ${maxDate.toISOString()}`,
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
