export interface IQuery<IdType> {
  search: string;
  elementsPerPage: number;
  page: number;
  lastElementId?: IdType;
}
