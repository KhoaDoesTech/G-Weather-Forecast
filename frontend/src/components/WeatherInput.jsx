import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WeatherInput = ({ getWeatherData }) => {
  const [city, setCity] = useState('');
  const [cityHistory, setCityHistory] = useState(() => {
    const savedHistory = localStorage.getItem('cityHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const handleSearch = () => {
    if (city) {
      getWeatherData(city);
      setCityHistory((prevHistory) => {
        if (!prevHistory.includes(city)) {
          return [...prevHistory, city];
        }
        return prevHistory;
      });
    }
  };

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherData(`${latitude},${longitude}`);
    });
  };

  const handleCityHistoryClick = (selectedCity) => {
    setCity(selectedCity);
    getWeatherData(selectedCity);
  };

  useEffect(() => {
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory));

    const timer = setTimeout(() => {
      setCityHistory([]);
      localStorage.removeItem('cityHistory');
    }, 86400000); // 86400000 milliseconds = 1 day

    return () => clearTimeout(timer);
  }, [cityHistory]);

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

      {cityHistory.length > 0 && (
        <div className="history-search">
          <h3>Search History</h3>
          <ul className="history-card">
            {cityHistory.map((city, index) => (
              <li
                className="history-list"
                key={index}
                onClick={() => handleCityHistoryClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

WeatherInput.propTypes = {
  getWeatherData: PropTypes.func.isRequired,
};

export default WeatherInput;
