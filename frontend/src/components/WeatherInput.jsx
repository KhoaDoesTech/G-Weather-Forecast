import { useState } from 'react';
import PropTypes from 'prop-types';

const WeatherInput = ({ getWeatherData }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      getWeatherData(city);
    }
  };

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherData(`${latitude},${longitude}`);
    });
  };

  return (
    <div className="weather-input">
      <h3>Enter a City Name</h3>
      <input
        className="city-input"
        type="text"
        placeholder="E.g., New York, London, Tokyo"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
      <div className="separator"></div>
      <button className="location-btn" onClick={handleLocationSearch}>
        Use Current Location
      </button>
    </div>
  );
};

WeatherInput.propTypes = {
  getWeatherData: PropTypes.func.isRequired,
};

export default WeatherInput;
