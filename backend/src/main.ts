import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://g-weather-forecast-front-end.vercel.app',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
