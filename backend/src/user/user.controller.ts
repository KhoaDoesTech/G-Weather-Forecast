import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body('email') email: string, @Body('city') city: string) {
    const user = await this.userService.register(email, city);
    return user;
  }

  @Get('confirm')
  async confirmEmail(@Query('email') email: string) {
    return await this.userService.confirmEmail(email);
  }

  @Get('unsubscribe')
  async unsubscribe(@Query('email') email: string) {
    return await this.userService.unsubscribe(email);
  }
}
