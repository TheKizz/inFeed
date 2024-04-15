import { type HttpStatus } from "@nestjs/common";
import { type IResponse } from "../interfaces/response.interface";

export class ResponseFactory {
  static createSuccessfulResponse<DataType>(
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

  static createFailedResponse<DataType>(
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
}
