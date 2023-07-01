import { useSelector } from 'react-redux';
import { getData } from 'redux/home/homeSlice';
import waterDrop from 'assets/icons/drop.png';

const SelectedCity = () => {
  const { isLoading, error, selectedCity } = useSelector(getData);
  return (
    <div className="nearest-city-box">
      {isLoading && (
      <div>
        is Loading
        <div className="progress">
          <div className="inner">{}</div>
        </div>
      </div>
      )}
      {error && <p>{error}</p>}
      {(!isLoading && !error && selectedCity && Object.keys(selectedCity).length !== 0)
            && (
            <>
              <div className="weather-infos-box">
                <div className="weather-icon-box">
                  <img src={`https://download.spinetix.com/content/widgets/icons/weather/${selectedCity.weather.icon}.png`} alt="weather icon" />
                </div>
                <div className="weather-data-box">
                  <div className="temp-box">
                    {selectedCity.weather.temp}
                    °
                  </div>
                  <div className="hu-box">
                    <img src={waterDrop} alt="water drop" />
                    {selectedCity.weather.hu}
                    %
                  </div>
                  <div className="ws-box">
                    ws:
                    {' '}
                    {selectedCity.weather.ws}
                    m/s
                  </div>
                </div>
              </div>
              <div className="air-data-box">
                <h1 className="city">
                  {selectedCity.city}
                  {' '}
                  Air Quality Index
                </h1>
                <p className={selectedCity.pollutionLevel}>
                  {selectedCity.aqi}
                </p>
                <p
                  className={selectedCity.pollutionLevel}
                >
                  {selectedCity.pollutionLevel}
                  <span className="pollutant">
                    PM2.5:
                    {' '}
                    {selectedCity.pollution.pm2_5}
                    μg/m
                    <sup>3</sup>
                  </span>
                  <span className="pollutant">
                    PM10:
                    {' '}
                    {selectedCity.pollution.pm10}
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

export default SelectedCity;
