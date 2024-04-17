import { type IQuery } from "./query.interface";

export interface IPaginatedResult<IdType, DataType> {
  query: IQuery<IdType>;
  result: DataType[];
  currentPage: number;
  lastPage: number;
  firstPage: number;
  totalPages: number;
  totalElements: number;
}
