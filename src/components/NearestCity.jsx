import PropTypes from 'prop-types';
import waterDrop from 'assets/icons/drop.png';

const NearestCity = ({
  city, selectedCity, isLoading, error,
}) => {
  let currentCity = city;
  if (selectedCity && Object.keys(selectedCity).length !== 0) currentCity = selectedCity;

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
      {(!isLoading && !error && currentCity && Object.keys(currentCity).length !== 0)
            && (
            <>
              <div className="weather-infos-box">
                <div className="weather-icon-box">
                  <img src={`https://download.spinetix.com/content/widgets/icons/weather/${currentCity.weather.icon}.png`} alt="weather icon" />
                </div>
                <div className="weather-data-box">
                  <div className="temp-box">
                    {currentCity.weather.temp}
                    °
                  </div>
                  <div className="hu-box">
                    <img src={waterDrop} alt="water drop" />
                    {currentCity.weather.hu}
                    %
                  </div>
                  <div className="ws-box">
                    ws:
                    {' '}
                    {currentCity.weather.ws}
                    m/s
                  </div>
                </div>
              </div>
              <div className="air-data-box">
                <h1 className="city">
                  {currentCity.city}
                  {' '}
                  Air Quality Index
                </h1>
                <p className={currentCity.pollutionLevel}>
                  {currentCity.aqi}
                </p>
                <p
                  className={currentCity.pollutionLevel}
                >
                  {currentCity.pollutionLevel}
                  <span className="pollutant">
                    PM2.5:
                    {' '}
                    {currentCity.pollution.pm2_5}
                    μg/m
                    <sup>3</sup>
                  </span>
                  <span className="pollutant">
                    PM10:
                    {' '}
                    {currentCity.pollution.pm10}
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
  selectedCity: PropTypes.shape({
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
