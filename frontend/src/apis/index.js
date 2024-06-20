import axios from 'axios';

export const BASE_URL = 'https://g-weather-forecast-backend.vercel.app';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  credentials: 'include',
});

export const apiInstance = API;
