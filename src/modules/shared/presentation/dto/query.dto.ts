import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { type IQuery } from "../../core/application/query.interface";

export class QueryDto<IdType> implements IQuery<IdType> {
  @IsOptional()
  @IsString()
  search: string = "";

  @IsOptional()
  @IsNumber()
  elementsPerPage: number = 20;

  @IsOptional()
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @IsNotEmpty()
  lastElementId?: IdType;
}
