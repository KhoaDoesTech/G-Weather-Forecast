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
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Please Confirm Your Email</h2>
          <p>Click the link below to confirm your email address:</p>
          <p><a href="${confirmationLink}" style="color: #1a73e8;">Confirm Email</a></p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendSuccessEmail(email: string, city: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Subscription Success',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Subscription Success</h2>
          <p>You have successfully subscribed to the weather updates for ${city}.</p>
          <p>To unsubscribe, click <a href="https://g-weather-forecast-backend.vercel.app/user/unsubscribe?email=${email}" style="color: #1a73e8;">here</a>.</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
    await this.sendWeatherEmail(
      email,
      await this.weatherService.getCurrentWeather(city),
    );
  }

  async sendWeatherEmail(
    email: string,
    currentWeather: Weather,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Weather Forecast for ${currentWeather.city}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Weather Forecast for ${currentWeather.city}</h2>
          <p><strong>Time:</strong> ${currentWeather.time}</p>
          <p><strong>Temperature:</strong> ${currentWeather.temperature}°F</p>
          <p><strong>Wind Speed:</strong> ${currentWeather.windSpeed} mph</p>
          <p><strong>Humidity:</strong> ${currentWeather.humidity}%</p>
          <p><strong>Condition:</strong> ${currentWeather.condition.text}</p>
          <p>To unsubscribe, click <a href="https://g-weather-forecast-backend.vercel.app/user/unsubscribe?email=${email}" style="color: #1a73e8;">here</a>.</p>
        </div>
      `,
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
        try {
          const currentWeather =
            await this.weatherService.getCurrentWeather(city);
          await this.sendWeatherEmail(email, currentWeather);
        } catch (error) {
          console.error(`Failed to schedule email for ${city}:`, error);
        }
      },
      {
        scheduled: true,
        timezone: timeZone,
      },
    );
  }

  async scheduleDailyWeatherEmails(): Promise<void> {
    try {
      const users = await this.userRepository.findAllSubscribedUsers();
      for (const user of users) {
        for (const city of user.city) {
          try {
            const timeZone = await this.getCityTimeZone(city);
            await this.scheduleEmailForCity(user.email, city, timeZone);
          } catch (error) {
            console.error(`Failed to get timezone for city ${city}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to schedule daily weather emails:', error);
    }
  }

  private async getCityTimeZone(city: string): Promise<string> {
    const apiKey = process.env.TIMEZONE_API_KEY;
    const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=city&city=${city}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.status === 'OK') {
        return response.data.zoneName;
      } else {
        throw new Error(`Timezone API error: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Failed to fetch timezone for city ${city}:`, error);
      throw error;
    }
  }
}
