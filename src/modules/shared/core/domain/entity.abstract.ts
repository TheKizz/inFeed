export interface PrimitiveEntity<IdType> {
  id: IdType;
}

export abstract class Entity<IdType> {
  readonly id: IdType;

  protected constructor(id: IdType) {
    this.id = id;
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

  abstract toPrimitive(): PrimitiveEntity<unknown>;
}
