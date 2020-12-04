import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // check if value is present and not custom
    console.log(metatype);
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    console.log(value);
    // if value is custom, transform to object
    const object = plainToClass(metatype, value, {
      enableImplicitConversion: true,
    });
    console.log(object);
    const errors = await validate(object);
    console.log(errors);
    if (errors.length > 0) {
      throw new BadRequestException(`Validation failed: ${errors}`);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
