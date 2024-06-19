import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async register(email: string, city: string): Promise<User> {
    let foundUser = await this.userRepository.findByEmail(email);
    if (foundUser) {
      if (foundUser.isConfirmed) {
        foundUser = await this.userRepository.addCityToUser(email, city);
        foundUser = await this.userRepository.updateUser(email, {
          subscribed: true,
        });
        await this.emailService.sendSuccessEmail(email, city);
      } else {
        await this.emailService.sendConfirmationEmail(email);
      }
    } else {
      foundUser = await this.userRepository.createUser(email, city);
      await this.emailService.sendConfirmationEmail(email);
    }
    return foundUser;
  }

  async confirmEmail(email: string): Promise<User> {
    const user = await this.userRepository.updateUser(email, {
      isConfirmed: true,
      subscribed: true,
    });
    await this.emailService.sendSuccessEmail(email, user.city[0]);
    await this.emailService.scheduleDailyWeatherEmails();
    return user;
  }

  async unsubscribe(email: string): Promise<User> {
    return await this.userRepository.updateUser(email, { subscribed: false });
  }
}
