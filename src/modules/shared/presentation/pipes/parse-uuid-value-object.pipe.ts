import {
  type PipeTransform,
  Injectable,
  type ArgumentMetadata,
} from "@nestjs/common";
import { UUIDValueObject } from "../../core/domain/uuid.value-object";

@Injectable()
export class ParseUUIDValueObjectPipe
  implements PipeTransform<string, UUIDValueObject>
{
  transform(value: string, metadata: ArgumentMetadata): UUIDValueObject {
    return new UUIDValueObject(value);
  }
}
