import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    HttpModule,
    UserModule,
    WeatherModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
