import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.filter';
import { FallbackExceptionFilter } from './filters/fallback.filter';
// import { ValidationPipe } from './pipes/validation.pipe';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );

  // Default NestJS validation, works for Partials, but does not validate nested arrays of Class
  // Due to @Type(() => Class) for arrays
  // Siogle nested classes needs separate validations
  // Custom advanced pipe is needed
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     skipMissingProperties: true,
  //     exceptionFactory: (errors: ValidationError[]) => {
  //       console.log('here');
  //       const messages = errors.map(
  //         (error) => `${error.property} has wrong value ${error.value},
  //         ${Object.values(error.constraints).join(', ')} `,
  //       );

  //       return new ValidationException(messages);
  //     },
  //   }),
  // );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
