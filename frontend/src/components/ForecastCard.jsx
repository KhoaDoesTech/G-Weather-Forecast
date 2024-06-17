import PropTypes from 'prop-types';

const ForecastCard = ({ day }) => {
  return (
    <li className="card">
      <h3>({day.date})</h3>
      <div className="icon">
        <img
          src={'https:' + day.day.condition.icon}
          alt={day.day.condition.text}
        />
      </div>
      <h6>Temp: {day.day.avgtemp_c}°C</h6>
      <h6>Wind: {day.day.maxwind_kph} KPH</h6>
      <h6>Humidity: {day.day.avghumidity}%</h6>
    </li>
  );
};

ForecastCard.propTypes = {
  day: PropTypes.object.isRequired,
};

export default ForecastCard;
