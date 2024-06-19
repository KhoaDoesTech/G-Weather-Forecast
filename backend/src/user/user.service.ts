import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async sendConfirmationEmail(email: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      secureConnection: false,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirm your email',
      text: `Please confirm your email by clicking the following link: http://localhost:3000/user/confirm?email=${email}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async register(email: string, city: string): Promise<User> {
    let user = await this.userRepository.findByEmail(email);
    if (user) {
      user = await this.userRepository.addCityToUser(email, city);
    } else {
      user = await this.userRepository.createUser(email, city);
      await this.sendConfirmationEmail(email);
    }
    return user;
  }

  async confirmEmail(email: string): Promise<User> {
    return await this.userRepository.updateUser(email, { isConfirmed: true });
  }

  async unsubscribe(email: string): Promise<User> {
    return await this.userRepository.updateUser(email, { subscribed: false });
  }
}
