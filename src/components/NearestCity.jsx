import PropTypes from 'prop-types';
import waterDrop from 'assets/icons/drop.png';

const NearestCity = ({ city, isLoading, error }) => (
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
    {(!isLoading && !error && city && Object.keys(city).length !== 0)
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

export default NearestCity;

NearestCity.propTypes = {
  city: PropTypes.shape({
    city: PropTypes.string,
    pollutionLevel: PropTypes.string,
    aqi: PropTypes.number,
    weather: PropTypes.shape({
      icon: PropTypes.string,
      temp: PropTypes.number,
      hu: PropTypes.number,
      ws: PropTypes.number,
    }),
    pollution: PropTypes.shape({
      pm2_5: PropTypes.number,
      pm10: PropTypes.number,
    }),
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.string,
};
