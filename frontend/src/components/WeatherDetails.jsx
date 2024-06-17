import PropTypes from 'prop-types';

const WeatherDetails = ({ weather }) => {
  return (
    <div className="current-weather">
      <div className="details">
        <h2>
          {weather.location.name} ({weather.location.localtime})
        </h2>
        <h6>Temperature: {weather.current.temp_c}°C</h6>
        <h6>Wind: {weather.current.wind_kph} KPH</h6>
        <h6>Humidity: {weather.current.humidity}%</h6>
      </div>
      <div className="icon">
        <img
          src={'https:' + weather.current.condition.icon}
          alt={weather.current.condition.text}
        />
        <h6>{weather.current.condition.text}</h6>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default WeatherDetails;
