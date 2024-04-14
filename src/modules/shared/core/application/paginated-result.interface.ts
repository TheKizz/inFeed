import { type IEntity } from "../domain/entity.interface";
import { type IQuery } from "./query.interface";

export interface IPaginatedResult<IdType, EntityType extends IEntity<IdType>> {
  query: IQuery<IdType>;
  result: EntityType[];
  lastPage: number;
  firstPage: number;
  totalPages: number;
  totalElements: number;
}
