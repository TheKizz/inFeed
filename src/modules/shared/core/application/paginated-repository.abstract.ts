import { type Entity } from "../domain/entity.abstract";
import { type IPaginatedResult } from "./paginated-result.interface";
import { type IQuery } from "./query.interface";

export abstract class PaginatedRepository<
  IdType,
  EntityType extends Entity<IdType>,
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
    const firstPage: number = totalElements > 0 ? 1 : 0;
    const totalPages: number = Math.ceil(totalElements / elementsPerPage);
    const currentPage: number =
      query?.page < firstPage
        ? firstPage
        : query?.page > totalPages
          ? totalPages
          : query?.page;
    return {
      query,
      result,
      currentPage,
      lastPage: totalPages,
      firstPage,
      totalPages,
      totalElements,
    };
  }
}
