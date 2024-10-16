import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(objectId: any, metadata: ArgumentMetadata) {
    if (isValidObjectId(objectId)) {
      return objectId;
    } else {
      throw new BadRequestException('ObjectID is not valid');
    }
  }
}
