import { type ValueObject } from "./value-object.abstract";

export abstract class Entity<IdType extends ValueObject> {
  readonly id: IdType;

  protected constructor(id: IdType) {
    this.id = id;
  }
}
