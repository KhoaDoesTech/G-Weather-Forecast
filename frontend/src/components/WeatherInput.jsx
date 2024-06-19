import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HistorySearch from './HistorySearch';

function WeatherInput({ searchCityData }) {
  const [city, setCity] = useState('');
  const now = new Date();
  const ONE_DAY = 86400000; // 86400000 milliseconds = 1 day
  const [cityHistory, setCityHistory] = useState(() => {
    const savedHistory = getItemWithExpiry('cityHistory');
    return savedHistory;
  });

  const handleSearch = async () => {
    const foundCity = await searchCityData(city);
    if (foundCity) {
      setCityHistory((prevHistory) => {
        if (!prevHistory.some((city) => city.value === foundCity)) {
          const newHistory = [
            ...prevHistory,
            { value: foundCity, expiry: now.getTime() + ONE_DAY },
          ];
          localStorage.setItem('cityHistory', JSON.stringify(newHistory));
          return newHistory;
        }
        return prevHistory;
      });
    }
  };

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const foundCity = await searchCityData(`${latitude},${longitude}`);
      if (foundCity) {
        setCityHistory((prevHistory) => {
          if (!prevHistory.some((city) => city.value === foundCity)) {
            const newHistory = [
              ...prevHistory,
              { value: foundCity, expiry: now.getTime() + ONE_DAY },
            ];
            localStorage.setItem('cityHistory', JSON.stringify(newHistory));
            return newHistory;
          }
          return prevHistory;
        });
      }
    });
  };

  const handleCityHistoryClick = (selectedCity) => {
    setCity(selectedCity);
    searchCityData(selectedCity);
  };

  useEffect(() => {
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
  }, [cityHistory]);

  function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return [];
    }
    let items = JSON.parse(itemStr);

    items = items.filter((item) => {
      if (now.getTime() > item.expiry) {
        return false;
      }
      return true;
    });

    localStorage.setItem(key, JSON.stringify(items)); // Update the array in local storage

    return items;
  }

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

      <HistorySearch
        onCitySelect={handleCityHistoryClick}
        cityHistory={cityHistory}
      />
    </div>
  );
}

WeatherInput.propTypes = {
  searchCityData: PropTypes.func.isRequired,
};

export default WeatherInput;
