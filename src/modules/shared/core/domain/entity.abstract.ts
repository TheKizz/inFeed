import { ValueObject } from "./value-object.abstract";

export interface PrimitiveEntity<IdType> {
  id: IdType;
}

export abstract class Entity<IdType> {
  protected readonly _id: IdType;

  constructor(id: IdType) {
    this._id = id;
  }

  protected getPrimitiveEntity<
    OutputType extends PrimitiveEntity<unknown>,
  >(): OutputType {
    const primitiveEntity: OutputType = Object.entries(this).reduce(
      (
        object,
        [key, value]: [string, ValueObject | undefined | Entity<IdType>],
      ) => {
        const keyWithoutUnderscore: string = key.replace(/^_/, "");
        const primitiveValue: unknown = this.getPrimitiveValue(value);
        return {
          ...object,
          [keyWithoutUnderscore]: primitiveValue,
        };
      },
      {},
    ) as OutputType;
    return primitiveEntity;
  }

  get id(): IdType {
    return this._id;
  }

  private canBePrimitive(value: unknown): boolean {
    return value instanceof ValueObject || value instanceof Entity;
  }

  private getPrimitiveValue(
    value: ValueObject | undefined | Entity<IdType>,
  ): unknown {
    let primitiveValue: unknown;
    if (value === undefined || value === null) primitiveValue = value;
    else if (Array.isArray(value)) {
      primitiveValue = value.map((value) =>
        this.canBePrimitive(value) ? value.getPrimitiveValue(value) : value,
      );
    } else if (this.canBePrimitive(value)) primitiveValue = value.toPrimitive();
    else primitiveValue = value;
    return primitiveValue;
  }

  abstract toPrimitive(): PrimitiveEntity<unknown>;
}
