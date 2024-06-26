import { ValueObject } from "./value-object.abstract";

export class UUIDValueObject extends ValueObject {
  readonly value: string;

  constructor(value: string) {
    super(false, value);
    this.validate(value);
    this.value = value;
  }

  protected validate(uuid: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) {
      throw new Error(`Invalid UUID: ${uuid}`);
    }
  }

  toPrimitive(): string {
    return this.value;
  }
}
