/*eslint-disable*/
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringValidationPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid parameter: must be a string');
    }
    return value;
  }
}
