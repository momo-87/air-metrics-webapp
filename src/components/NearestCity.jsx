import { useSelector } from 'react-redux';
import { getData } from 'redux/home/homeSlice';
import waterDrop from 'assets/icons/drop.png';

const NearestCity = () => {
  const { city, isLoading, error } = useSelector(getData);
  return (
    <div className="nearest-city-box">
      {!isLoading && <p>is Loading...</p>}
      {error && <p>{error}</p>}
      <div className="weather-infos-box">
        <div className="weather-icon-box">
          <img src={`https://download.spinetix.com/content/widgets/icons/weather/${city.icon}.png`} alt="weather icon" />
        </div>
        <div className="weather-data-box">
          <div className="temp-box">
            {city.temp}
            °
          </div>
          <div className="hu-box">
            <img src={waterDrop} alt="water drop" />
            {city.hu}
            %
          </div>
          <div className="ws-box">
            ws:
            {' '}
            {city.ws}
            m/s
          </div>
        </div>
      </div>
      <div className="air-data-box">
        <h1 className="city">
          {city.city}
          {' '}
          Air Quality Index
        </h1>
        <p className="aqi-value">
          {city.aqius}
        </p>
        <p className="aqi-source">US AQI</p>
      </div>
    </div>
  );
};

export default NearestCity;
