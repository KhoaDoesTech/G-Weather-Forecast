"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const email_config_1 = require("./email.config");
const axios_1 = require("axios");
const weather_service_1 = require("../weather/weather.service");
const cron = require("node-cron");
const user_repository_1 = require("../user/user.repository");
let EmailService = class EmailService {
    constructor(weatherService, userRepository) {
        this.weatherService = weatherService;
        this.userRepository = userRepository;
        this.transporter = (0, email_config_1.createEmailTransport)();
    }
    async sendConfirmationEmail(email) {
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
    async sendSuccessEmail(email, city) {
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
        await this.sendWeatherEmail(email, await this.weatherService.getCurrentWeather(city));
    }
    async sendWeatherEmail(email, currentWeather) {
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
    async scheduleEmailForCity(email, city, timeZone) {
        const cronTime = '0 6 * * *';
        cron.schedule(cronTime, async () => {
            try {
                const currentWeather = await this.weatherService.getCurrentWeather(city);
                await this.sendWeatherEmail(email, currentWeather);
            }
            catch (error) {
                console.error(`Failed to schedule email for ${city}:`, error);
            }
        }, {
            scheduled: true,
            timezone: timeZone,
        });
    }
    async scheduleDailyWeatherEmails() {
        try {
            const users = await this.userRepository.findAllSubscribedUsers();
            for (const user of users) {
                for (const city of user.city) {
                    try {
                        const timeZone = await this.getCityTimeZone(city);
                        await this.scheduleEmailForCity(user.email, city, timeZone);
                    }
                    catch (error) {
                        console.error(`Failed to get timezone for city ${city}:`, error);
                    }
                }
            }
        }
        catch (error) {
            console.error('Failed to schedule daily weather emails:', error);
        }
    }
    async getCityTimeZone(city) {
        const apiKey = process.env.TIMEZONE_API_KEY;
        const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=city&city=${city}`;
        try {
            const response = await axios_1.default.get(apiUrl);
            if (response.data.status === 'OK') {
                return response.data.zoneName;
            }
            else {
                throw new Error(`Timezone API error: ${response.data.message}`);
            }
        }
        catch (error) {
            console.error(`Failed to fetch timezone for city ${city}:`, error);
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [weather_service_1.WeatherService,
        user_repository_1.UserRepository])
], EmailService);
//# sourceMappingURL=email.service.js.map