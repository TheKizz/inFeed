export interface IResponse<DataType, ErrorType = any[]> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: DataType;
  errors?: ErrorType;
}
