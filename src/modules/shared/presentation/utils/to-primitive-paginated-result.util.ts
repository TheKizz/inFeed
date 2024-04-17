import { type IPaginatedResult } from "../../core/application/paginated-result.interface";
import { type Entity } from "../../core/domain/entity.abstract";
import { type ValueObject } from "../../core/domain/value-object.abstract";

export function toPrimitivePaginatedResult<
  PrimitiveIdType,
  PrimitiveDataType,
  PaginatedIdType extends ValueObject,
  PaginatedDataType extends Entity<PaginatedIdType>,
>(
  data: IPaginatedResult<PaginatedIdType, PaginatedDataType>,
): IPaginatedResult<PrimitiveIdType, PrimitiveDataType> {
  return {
    ...data,
    query: {
      ...data.query,
      lastElementId: data.query.lastElementId?.toPrimitive() as PrimitiveIdType,
    },
    result: data.result.map((entity) =>
      entity.toPrimitive(),
    ) as PrimitiveDataType[],
  };
}
