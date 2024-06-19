import PropTypes from 'prop-types';

const HistorySearch = ({ onCitySelect, cityHistory }) => {
  return (
    <div className="history-search">
      <h3>Search History</h3>
      <ul className="history-card">
        {cityHistory.map((cityWeather, index) => (
          <li
            className="history-list"
            key={index}
            onClick={() => onCitySelect(cityWeather.value)}
          >
            {cityWeather.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

HistorySearch.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  cityHistory: PropTypes.array.isRequired,
};

export default HistorySearch;
