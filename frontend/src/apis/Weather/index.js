import { apiInstance } from '..';

export const getCurrentWeather = async (city) => {
  try {
    const response = await apiInstance.get(`/weather/current/${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};

// export const getWeatherForecast = async (city) => {
//   try {
//     const response = await apiInstance.get('http://localhost:5000/weather', {
//       city,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching weather data', error);
//   }
// };
