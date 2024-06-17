import PropTypes from 'prop-types';
import ForecastCard from './ForecastCard';

const WeatherForecast = ({ forecast }) => {
  return (
    <div className="days-forecast">
      <h2>4-Day Forecast</h2>
      <ul className="weather-cards">
        {forecast.map((day) => (
          <ForecastCard key={day.date} day={day} />
        ))}
      </ul>
    </div>
  );
};

WeatherForecast.propTypes = {
  forecast: PropTypes.array.isRequired,
};

export default WeatherForecast;
