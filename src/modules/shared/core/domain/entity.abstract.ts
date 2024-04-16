export interface PrimitiveEntity<IdType> {
  id: IdType;
}

export abstract class Entity<IdType> {
  protected readonly _id: IdType;

  protected constructor(id: IdType) {
    this._id = id;
  }

  protected getPrimitiveEntity<
    OutputType extends PrimitiveEntity<unknown>,
  >(): OutputType {
    const primitiveUserEntity: OutputType = Object.entries(this).reduce(
      (object, [key, valueObject]) => {
        const keyWithoutUnderscore: string = key.replace(/^_/, "");
        return { ...object, [keyWithoutUnderscore]: valueObject.value };
      },
      {},
    ) as OutputType;
    return primitiveUserEntity;
  }

  get id(): IdType {
    return this._id;
  }

  abstract toPrimitive(): PrimitiveEntity<unknown>;
}
