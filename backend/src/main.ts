import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://g-weather-forecast-front-end.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
