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
            html: `<p>Please confirm your email by clicking the following link: <a href="${confirmationLink}">Confirm</a></p>`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendSuccessEmail(email, city) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Subscription Success',
            text: `You have successfully subscribed to ${city} weather.`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendWeatherEmail(email, currentWeather) {
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
    async scheduleEmailForCity(email, city, timeZone) {
        const cronTime = '0 6 * * *';
        cron.schedule(cronTime, async () => {
            const currentWeather = await this.weatherService.getCurrentWeather(city);
            await this.sendWeatherEmail(email, currentWeather);
        }, {
            scheduled: true,
            timezone: timeZone,
        });
    }
    async scheduleDailyWeatherEmails() {
        const users = await this.userRepository.findAllSubscribedUsers();
        for (const user of users) {
            for (const city of user.city) {
                const timeZone = await this.getCityTimeZone(city);
                await this.scheduleEmailForCity(user.email, city, timeZone);
            }
        }
    }
    async getCityTimeZone(city) {
        const apiKey = process.env.TIMEZONE_API_KEY;
        const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${city}`;
        const response = await axios_1.default.get(apiUrl);
        return response.data.zoneName;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [weather_service_1.WeatherService,
        user_repository_1.UserRepository])
], EmailService);
//# sourceMappingURL=email.service.js.map