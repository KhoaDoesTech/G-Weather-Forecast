import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://g-weather-forecast-front-end.vercel.app'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
