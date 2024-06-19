import { apiInstance } from '..';

export const postSubscribe = async (email, city) => {
  try {
    const response = await apiInstance.post(`/subscribe`, { email, city });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};
