import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { EmailService } from '../email/email.service';
import { WeatherService } from '../weather/weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository, EmailService, WeatherService],
  controllers: [UserController],
})
export class UserModule {}
