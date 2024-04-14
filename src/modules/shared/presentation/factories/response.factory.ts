import { type HttpStatus } from "@nestjs/common";
import { type IResponse } from "../interfaces/response.interface";

export function createSuccessfulResponse<DataType>(
  statusCode: HttpStatus,
  message: string,
  data: DataType,
): IResponse<DataType> {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
}

export function createFailedResponse<DataType>(
  statusCode: HttpStatus,
  message: string,
  errors?: any[],
): IResponse<DataType> {
  return {
    success: false,
    statusCode,
    message,
    errors,
  };
}
