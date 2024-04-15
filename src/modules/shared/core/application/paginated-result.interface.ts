import { type Entity } from "../domain/entity.abstract";
import { type IQuery } from "./query.interface";

export interface IPaginatedResult<IdType, EntityType extends Entity<IdType>> {
  query: IQuery<IdType>;
  result: EntityType[];
  lastPage: number;
  firstPage: number;
  totalPages: number;
  totalElements: number;
}
