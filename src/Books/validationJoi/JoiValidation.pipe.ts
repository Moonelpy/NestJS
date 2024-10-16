import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema, ValidationErrorItem } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    // Собираем все ошибки
    const { error } = this.schema.validate(value, { abortEarly: false });

    if (error) {
      // Более детальная инфомация об ошибках
      const errorMessages = error.details
        .map((detail: ValidationErrorItem) => detail.message)
        .join(', ');
      throw new BadRequestException(`Ошибка валидации: ${errorMessages}`);
    }

    return value;
  }
}
