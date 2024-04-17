import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { type IQuery } from "../../core/application/query.interface";
import { Type } from "class-transformer";

export class QueryDto<IdType> implements IQuery<IdType> {
  @IsOptional()
  @IsString()
  readonly search: string = "";

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly elementsPerPage: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly page: number = 1;

  @IsOptional()
  @IsNotEmpty()
  readonly lastElementId?: IdType;
}
