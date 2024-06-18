import { HttpService } from '@nestjs/axios';
export declare class WeatherService {
    private httpService;
    constructor(httpService: HttpService);
    getCurrentWeather(city: string): Promise<{
        city: any;
        time: any;
        temperature: any;
        windSpeed: any;
        humidity: any;
        condition: any;
    }>;
    getWeatherForecast(city: string, page: number, limit: number): Promise<{
        data: any;
        page: number;
        limit: number;
        total: any;
    }>;
    searchCity(keySearch: string): Promise<Error | {
        city: any;
    }>;
}
