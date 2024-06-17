import { useState } from 'react';
import WeatherDetails from './components/WeatherDetails';
import WeatherForecast from './components/WeatherForecast';
import WeatherInput from './components/WeatherInput';
import { getCurrentWeather } from './apis/Weather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const getWeatherData = async (city) => {
    const apiKey = '9802bcba364d4b2a82483858241706';

    const weatherData = await getCurrentWeather(city);
    setCurrentWeather(weatherData);

    const forecastResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4`
    );
    const forecastData = await forecastResponse.json();
    setForecast(forecastData.forecast.forecastday);
  };

  return (
    <>
      <h1>Weather Dashboard</h1>
      <div className="container">
        <WeatherInput getWeatherData={getWeatherData} />
        <div className="weather-data">
          {currentWeather && <WeatherDetails weather={currentWeather} />}
          {forecast.length > 0 && <WeatherForecast forecast={forecast} />}
        </div>
      </div>
    </>
  );
}

export default App;
