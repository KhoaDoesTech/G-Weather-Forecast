import { Controller, Get, Param, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('current/:city')
  async getCurrentWeather(@Param('city') city: string) {
    const currentWeather = await this.weatherService.getCurrentWeather(city);
    return currentWeather;
  }

  @Get('forecast/:city')
  async getWeatherForecast(
    @Param('city') city: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 4,
  ) {
    const forecast = await this.weatherService.getWeatherForecast(
      city,
      page,
      limit,
    );
    return forecast;
  }

  @Get('search/:keySearch')
  async searchCity(@Param('keySearch') keySearch: string) {
    const city = await this.weatherService.searchCity(keySearch);
    return city;
  }
}
