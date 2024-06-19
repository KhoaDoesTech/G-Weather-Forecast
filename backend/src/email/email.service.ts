import { Injectable } from '@nestjs/common';
import { createEmailTransport } from './email.config';
import axios from 'axios';
import { WeatherService } from '../weather/weather.service';
import * as cron from 'node-cron';
import { UserRepository } from '../user/user.repository';

interface Weather {
  city: string;
  time: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  condition: {
    text: string;
    icon: string;
  };
}

@Injectable()
export class EmailService {
  private transporter = createEmailTransport();

  constructor(
    private readonly weatherService: WeatherService,
    private readonly userRepository: UserRepository,
  ) {}

  async sendConfirmationEmail(email: string): Promise<void> {
    const confirmationLink = `https://g-weather-forecast-backend.vercel.app/user/confirm?email=${email}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirm your email',
      html: `<p>Please confirm your email by clicking the following link: <a href="${confirmationLink}">Confirm</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendSuccessEmail(email: string, city: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Subscription Success',
      text: `You have successfully subscribed to ${city} weather.
      To unsubscribe, click here: https://g-weather-forecast-backend.vercel.app/user/unsubscribe?email=${email}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendWeatherEmail(
    email: string,
    currentWeather: Weather,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Weather Forecast for ${currentWeather.city}`,
      text: `Good morning! Here is the weather forecast for ${currentWeather.city}:\n\n
      Time: ${currentWeather.time}
      Temperature: ${currentWeather.temperature}°F
      Wind Speed: ${currentWeather.windSpeed} mph
      Humidity: ${currentWeather.humidity}%
      Condition: ${currentWeather.condition.text}
      To unsubscribe, click here: https://g-weather-forecast-backend.vercel.app/user/unsubscribe?email=${email}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  private async scheduleEmailForCity(
    email: string,
    city: string,
    timeZone: string,
  ): Promise<void> {
    const cronTime = '0 6 * * *'; // 6 AM in the city's local time
    cron.schedule(
      cronTime,
      async () => {
        const currentWeather =
          await this.weatherService.getCurrentWeather(city);
        await this.sendWeatherEmail(email, currentWeather);
      },
      {
        scheduled: true,
        timezone: timeZone,
      },
    );
  }

  async scheduleDailyWeatherEmails(): Promise<void> {
    const users = await this.userRepository.findAllSubscribedUsers();
    for (const user of users) {
      for (const city of user.city) {
        // Assuming we can determine the city's timezone
        const timeZone = await this.getCityTimeZone(city);
        await this.scheduleEmailForCity(user.email, city, timeZone);
      }
    }
  }

  private async getCityTimeZone(city: string): Promise<string> {
    const apiKey = process.env.TIMEZONE_API_KEY;
    const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${city}`;

    const response = await axios.get(apiUrl);
    return response.data.zoneName;
  }
}
