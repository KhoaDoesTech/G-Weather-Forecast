import PropTypes from 'prop-types';

const WeatherDetails = ({ weather }) => {
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
  weather: PropTypes.object.isRequired,
};

export default WeatherDetails;
