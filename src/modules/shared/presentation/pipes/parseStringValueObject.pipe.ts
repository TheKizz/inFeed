import {
  type PipeTransform,
  Injectable,
  type ArgumentMetadata,
} from "@nestjs/common";
import { StringValueObject } from "../../core/domain/string.value-object";

@Injectable()
export class ParseStringValueObjectPipe
  implements PipeTransform<string, StringValueObject>
{
  transform(value: string, metadata: ArgumentMetadata): StringValueObject {
    return new StringValueObject(value);
  }
}
