import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const ForecastCard = forwardRef(({ day }, ref) => {
  return (
    <li className="card" ref={ref}>
      <h3>({day.date})</h3>
      <div className="icon">
        <img src={'https:' + day.condition.icon} alt={day.condition.text} />
      </div>
      <h6>Temp: {day.temperature}°C</h6>
      <h6>Wind: {day.windSpeed} KPH</h6>
      <h6>Humidity: {day.humidity}%</h6>
    </li>
  );
});

ForecastCard.displayName = 'ForecastCard';

ForecastCard.propTypes = {
  day: PropTypes.object.isRequired,
};

export default ForecastCard;
