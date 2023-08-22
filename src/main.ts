/*eslint-disable*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './Shared Modules/Pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_URL);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
