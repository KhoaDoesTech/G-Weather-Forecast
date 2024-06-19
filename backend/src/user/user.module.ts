import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { User, UserSchema } from './user.schema';
import { EmailService } from '../email/email.service';
import { WeatherService } from '../weather/weather.service';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository, EmailService, WeatherService],
  controllers: [UserController],
})
export class UserModule {}
