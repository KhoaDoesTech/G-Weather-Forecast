import { useState } from 'react';
import WeatherDetails from './components/WeatherDetails';
import WeatherForecast from './components/WeatherForecast';
import WeatherInput from './components/WeatherInput';
import { searchCity } from './apis/Weather';

function App() {
  const [city, setCity] = useState('');

  const searchCityData = async (keySearch) => {
    const cityData = await searchCity(keySearch);
    setCity(cityData);
  };

  return (
    <>
      <h1>Weather Dashboard</h1>
      <div className="container">
        <WeatherInput searchCityData={searchCityData} />
        <div className="weather-data">
          {city && <WeatherDetails city={city} />}
          {city && <WeatherForecast city={city} />}
        </div>
      </div>
    </>
  );
}

export default App;
