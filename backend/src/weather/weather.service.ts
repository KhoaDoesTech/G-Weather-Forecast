import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { lastValueFrom } from 'rxjs';

dotenv.config();

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) {}

  async getCurrentWeather(city: string) {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await lastValueFrom(this.httpService.get(url));
    const data = response.data;

    return {
      city: data.location.name,
      time: data.location.localtime,
      temperature: data.current.temp_c,
      windSpeed: data.current.wind_kph,
      humidity: data.current.humidity,
      condition: data.current.condition,
    };
  }

  async getWeatherForecast(city: string, page: number, limit: number) {
    const apiKey = process.env.WEATHER_API_KEY;
    const totalDays = 14; // Weather API allows up to 14 days
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${totalDays}`;
    const response = await lastValueFrom(this.httpService.get(url));
    const data = response.data;

    const forecast = data.forecast.forecastday.slice(1).map((item) => ({
      date: item.date,
      temperature: item.day.avgtemp_c,
      windSpeed: item.day.maxwind_kph,
      humidity: item.day.avghumidity,
      condition: item.day.condition,
    }));

    // Calculate start and end indices for the slice
    const start = (page - 1) * limit;
    const end = start + limit;

    // Slice the forecast array to get the requested page
    const pagedForecast = forecast.slice(start, end);

    return {
      data: pagedForecast,
      page: page,
      limit: limit,
      total: forecast.length,
    };
  }
}
