import { useSelector } from 'react-redux';
import { getData } from 'redux/home/homeSlice';
import waterDrop from 'assets/icons/drop.png';

const NearestCity = () => {
  const { city, isLoading, error } = useSelector(getData);
  return (
    <div className="nearest-city-box">
      {isLoading && (
      <div>
        is Loading
        <div className="lds-ripple">
          <div>{}</div>
          <div>{}</div>
        </div>
      </div>
      )}
      {error && <p>{error}</p>}
      {(!isLoading && !error && city && city.length !== 0)
            && (
            <>
              <div className="weather-infos-box">
                <div className="weather-icon-box">
                  <img src={`https://download.spinetix.com/content/widgets/icons/weather/${city.weather.icon}.png`} alt="weather icon" />
                </div>
                <div className="weather-data-box">
                  <div className="temp-box">
                    {city.weather.temp}
                    °
                  </div>
                  <div className="hu-box">
                    <img src={waterDrop} alt="water drop" />
                    {city.weather.hu}
                    %
                  </div>
                  <div className="ws-box">
                    ws:
                    {' '}
                    {city.weather.ws}
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
                <p className={city.pollutionLevel}>
                  {city.aqi}
                </p>
                <p
                  className={city.pollutionLevel}
                >
                  {city.pollutionLevel}
                  <span className="pollutant">
                    PM2.5:
                    {' '}
                    {city.pollution.pm2_5}
                    μg/m
                    <sup>3</sup>
                  </span>
                  <span className="pollutant">
                    PM10:
                    {' '}
                    {city.pollution.pm10}
                    μg/m
                    <sup>3</sup>
                  </span>
                </p>
              </div>
            </>
            )}
    </div>
  );
};

export default NearestCity;
