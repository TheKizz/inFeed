type EntityPropsName = keyof Pick<Entity<unknown>, "id">;

export abstract class Entity<IdType> {
  readonly id: IdType;

  protected constructor(id: IdType) {
    this.id = id;
  }

  protected getPrimitiveEntity<T extends string = EntityPropsName>(): Record<
    T,
    unknown
  > {
    const primitiveUserEntity: Record<T, unknown> = Object.entries(this).reduce(
      (object, [key, valueObject]) => {
        return { ...object, [key]: valueObject.value };
      },
      {},
    ) as Record<T, unknown>;
    return primitiveUserEntity;
  }

  abstract create(...props: unknown[]): unknown;
  abstract clone(...props: unknown[]): unknown;
  abstract toPrimitive(): Record<EntityPropsName, unknown>;
}
