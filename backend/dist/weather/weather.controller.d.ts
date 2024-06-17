import { WeatherService } from './weather.service';
export declare class WeatherController {
    private weatherService;
    constructor(weatherService: WeatherService);
    getCurrentWeather(city: string): Promise<{
        city: any;
        time: any;
        temperature: any;
        windSpeed: any;
        humidity: any;
        condition: any;
    }>;
    getWeatherForecast(city: string, page?: number, limit?: number): Promise<{
        data: any;
        page: number;
        limit: number;
        total: any;
    }>;
}
