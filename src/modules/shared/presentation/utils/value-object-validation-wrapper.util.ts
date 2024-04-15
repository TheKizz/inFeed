import { HttpException, HttpStatus } from "@nestjs/common";
import { type ValueObject } from "../../core/domain/value-object.abstract";

export function ValueObjectValidationWrapper<
  ValueObjectType extends ValueObject,
>(
  propertyName: string,
  valueObjectFunctionCreator: () => ValueObjectType,
): ValueObjectType {
  try {
    return valueObjectFunctionCreator();
  } catch (error: unknown) {
    throw new HttpException(
      `${propertyName}: ${(error as Error).message}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
