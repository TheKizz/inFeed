import { type IEntity } from "../domain/entity.interface";
import { type IPaginatedResult } from "./paginated-result.interface";
import { type IQuery } from "./query.interface";

export abstract class PaginatedRepository<
  IdType,
  EntityType extends IEntity<IdType>,
> {
  abstract search(
    query: IQuery<IdType>,
  ): Promise<IPaginatedResult<IdType, EntityType>>;
  protected buildPaginatedResult(
    query: IQuery<IdType>,
    result: EntityType[],
    totalElements: number,
  ): IPaginatedResult<IdType, EntityType> {
    const elementsPerPage: number =
      query?.elementsPerPage === undefined || query?.elementsPerPage <= 0
        ? 1
        : query?.elementsPerPage;
    return {
      query,
      result,
      lastPage: Math.ceil(totalElements / elementsPerPage),
      firstPage: totalElements > 0 ? 1 : 0,
      totalPages: Math.ceil(totalElements / elementsPerPage),
      totalElements,
    };
  }
}
