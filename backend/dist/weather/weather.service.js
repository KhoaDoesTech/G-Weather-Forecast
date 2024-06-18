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
exports.WeatherService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const rxjs_1 = require("rxjs");
dotenv.config();
let WeatherService = class WeatherService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getCurrentWeather(city) {
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
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
    async getWeatherForecast(city, page, limit) {
        const apiKey = process.env.WEATHER_API_KEY;
        const totalDays = 14;
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${totalDays}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        const data = response.data;
        const forecast = data.forecast.forecastday.slice(1);
        const forecastData = forecast
            .slice((page - 1) * limit, page * limit)
            .map((item) => ({
            date: item.date,
            temperature: item.day.avgtemp_c,
            windSpeed: item.day.maxwind_kph,
            humidity: item.day.avghumidity,
            condition: item.day.condition,
        }));
        return {
            data: forecastData,
            page: page,
            limit: limit,
            total: forecast.length,
        };
    }
    async searchCity(keySearch) {
        const apiKey = process.env.WEATHER_API_KEY;
        console.log(keySearch);
        const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${keySearch}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        const data = response.data;
        if (!data.length)
            return new Error('City not found');
        return {
            city: data[0].name,
        };
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map