import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ForecastCard from './ForecastCard';
import { getWeatherForecast } from '../apis/Weather';

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const observer = useRef();

  useEffect(() => {
    const resetForecast = () => {
      setForecast([]);
      setPage(1);
      setTotal(0);
    };
    resetForecast();
  }, [city]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchMoreForecast = async () => {
      setLoading(true);
      try {
        const forecastData = await getWeatherForecast(city, page);
        if (!isCancelled) {
          setForecast((prevForecast) => [
            ...prevForecast,
            ...forecastData.data,
          ]);
          setTotal(forecastData.total);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to fetch weather forecast:', error);
        }
      }
      if (!isCancelled) {
        setLoading(false);
      }
    };

    if (!isFirstRender) {
      fetchMoreForecast();
    } else {
      setIsFirstRender(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [page, city, isFirstRender]);

  const lastForecastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (node && forecast.length < total) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && forecast.length < total) {
            loadMore();
          }
        });
        observer.current.observe(node);
      }
    },
    [loading, forecast.length, total]
  );

  const groupedForecasts = [];
  for (let i = 0; i < forecast.length; i += 4) {
    groupedForecasts.push(forecast.slice(i, i + 4));
  }

  return (
    <div className="days-forecast">
      <h2>{forecast.length}-Day Forecast</h2>
      {groupedForecasts.map((group, groupIndex) => (
        <ul key={groupIndex} className="weather-cards">
          {group.map((day, index) => (
            <ForecastCard
              key={day.date}
              day={day}
              ref={
                index === group.length - 1 &&
                groupIndex === groupedForecasts.length - 1
                  ? lastForecastElementRef
                  : null
              }
            />
          ))}
        </ul>
      ))}
      {loading && <p>Loading...</p>}
      {forecast.length == 0 ||
        (forecast.length >= total && <p>No more data to load.</p>)}
    </div>
  );
};

WeatherForecast.propTypes = {
  city: PropTypes.string.isRequired,
};

export default WeatherForecast;
