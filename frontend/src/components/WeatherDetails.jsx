import PropTypes from 'prop-types';
import { getCurrentWeather } from '../apis/Weather';
import { useEffect, useState } from 'react';

const WeatherDetails = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await getCurrentWeather(city);
      setWeather(weatherData);
    };

    if (!isFirstRender) {
      fetchWeather();
    } else {
      setIsFirstRender(false);
    }
  }, [city, isFirstRender]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="current-weather">
      <div className="details">
        <h2>
          {weather.city} ({weather.time})
        </h2>
        <h6>Temperature: {weather.temperature}°C</h6>
        <h6>Wind: {weather.windSpeed} KPH</h6>
        <h6>Humidity: {weather.humidity}%</h6>
      </div>
      <div className="icon">
        <img
          src={'https:' + weather.condition.icon}
          alt={weather.condition.text}
        />
        <h6>{weather.condition.text}</h6>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  city: PropTypes.string.isRequired,
};

export default WeatherDetails;
