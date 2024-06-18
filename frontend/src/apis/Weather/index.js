import { apiInstance } from '..';

export const getCurrentWeather = async (city) => {
  try {
    const response = await apiInstance.get(`/weather/current/${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};

export const getWeatherForecast = async (city, page = 1) => {
  try {
    const response = await apiInstance.get(`/weather/forecast/${city}`, {
      params: {
        page,
        limit: 4,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};

export const searchCity = async (keySearch) => {
  try {
    const response = await apiInstance.get(`/weather/search/${keySearch}`);
    return response.data.city;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};
