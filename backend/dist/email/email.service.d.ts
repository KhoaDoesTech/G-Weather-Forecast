import { WeatherService } from '../weather/weather.service';
import { UserRepository } from 'src/user/user.repository';
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
export declare class EmailService {
    private readonly weatherService;
    private readonly userRepository;
    private transporter;
    constructor(weatherService: WeatherService, userRepository: UserRepository);
    sendConfirmationEmail(email: string): Promise<void>;
    sendSuccessEmail(email: string, city: string): Promise<void>;
    sendWeatherEmail(email: string, currentWeather: Weather): Promise<void>;
    private scheduleEmailForCity;
    scheduleDailyWeatherEmails(): Promise<void>;
    private getCityTimeZone;
}
export {};
