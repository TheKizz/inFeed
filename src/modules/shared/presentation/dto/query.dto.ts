import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { type IQuery } from "../../core/application/query.interface";

export class QueryDto<IdType> implements IQuery<IdType> {
  @IsOptional()
  @IsString()
  readonly search: string = "";

  @IsOptional()
  @IsNumber()
  readonly elementsPerPage: number = 20;

  @IsOptional()
  @IsNumber()
  readonly page: number = 1;

  @IsOptional()
  @IsNotEmpty()
  readonly lastElementId?: IdType;
}
