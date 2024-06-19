import { apiInstance } from '..';

export const postSubscribe = async (email, city) => {
  try {
    const response = await apiInstance.post(
      `/user/register`,
      { email, city },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':
            'https://g-weather-forecast-front-end.vercel.app',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};
