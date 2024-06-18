import axios from 'axios';

export const BASE_URL = 'https://g-weather-forecast-backend.vercel.app/';
// export const BASE_URL = 'http://localhost:3000/';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  credentials: 'include',
});

export const apiInstance = API;
