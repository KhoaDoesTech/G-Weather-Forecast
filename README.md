# G-Weather-Forecast

G-Weather-Forecast is a web application that allows users to search for weather information for a specific city or country. The application provides current weather data as well as a forecast for the next few days. Users can also subscribe to receive daily weather forecasts via email.

## Deployment

Backend: [https://g-weather-forecast-backend.vercel.app/](https://g-weather-forecast-backend.vercel.app/)

Frontend: [https://g-weather-forecast-front-end.vercel.app/](https://g-weather-forecast-front-end.vercel.app/)

# Getting Started

To get started with the G-Weather-Forecast, follow the steps below:

## Prerequisites

- Node.js

- Create an account on [WeatherAPI.com](https://www.weatherapi.com/) and obtain an API key.

- Create an Outlook Email Account

- Create an Account on [TimeZoneDB.com](https://timezonedb.com/api) and obtain an API Key

## Installation

### Clone the repository:

```sh
git clone https://github.com/KhoaDoesTech/G-Weather-Forecast.git
cd G-Weather-Forecast
```

### Install dependencies:

```sh
# For backend
cd backend
npm install

# For frontend
cd frontend
npm install
```

### Setup backend environment variables

Create a .env file in the backend directory and add your WeatherAPI key, TimezoneAPI key, MongoDB URI, and email credentials:

```.env

WEATHER_API_KEY=<your_weather_api_key_here>
TIMEZONE_API_KEY=<your_timezone_api_key_here>
MONGO_URI=<your_mongodb_uri_here>
EMAIL_USER=<your_email_user_here>
EMAIL_PASS=<your_email_password_here>

```

### Run the application:

```sh
# Start the backend server
cd backend
npm run start:dev

# Start the frontend application
cd ../frontend
npm run dev
```
