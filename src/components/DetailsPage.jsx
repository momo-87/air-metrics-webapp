import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import waterDrop from 'assets/icons/drop.png';
import { getData } from 'redux/home/homeSlice';

const DetailsPage = () => {
  const { clickedCity } = useSelector(getData);
  useEffect(() => {
    if (Object.keys(clickedCity).length > 0) {
      localStorage.setItem('clickedCity', JSON.stringify(clickedCity));
    }
  }, [clickedCity]);

  const city = Object.keys(clickedCity).length > 0 ? clickedCity : JSON.parse(localStorage.getItem('clickedCity'));

  // Add pillution Level to clicked city
  const pollutionLevel = (aqi) => {
    let level = '';
    switch (aqi) {
      case 1:
        level = 'Good';
        break;
      case 2:
        level = 'Fair';
        break;
      case 3:
        level = 'Moderate';
        break;
      case 4:
        level = 'Poor';
        break;
      case 5:
        level = 'Very Poor';
        break;
      default:
        city.pollutionLevel = '';
    }
    return level;
  };

  return (
    <>
      {city && Object.keys(city).length === 0 && <p className="no-data">Data Not Found</p>}
      {city && Object.keys(city).length !== 0 && (
      <>
        <div className="details-section">
          <NavLink to="/" className="back-arrow-link">
            <BsArrowLeftCircle className="back-arrow" />
          </NavLink>
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
            <p className={pollutionLevel(city.aqi)}>
              {city.aqi}
            </p>
            <p
              className={pollutionLevel(city.aqi)}
            >
              {pollutionLevel(city.aqi)}
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
        </div>
        <hr />
        <div className="other-pollutants">
          <h2>Other Pollutant Concentrations</h2>
          <p className="pollutant">
            CO:
            {' '}
            {city.pollution.co}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            NO:
            {' '}
            {city.pollution.no}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            NO2:
            {' '}
            {city.pollution.no2}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            O3:
            {' '}
            {city.pollution.o3}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            SO2:
            {' '}
            {city.pollution.so2}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            NH3:
            {' '}
            {city.pollution.nh3}
            μg/m
            <sup>3</sup>
          </p>
        </div>
      </>
      )}
    </>
  );
};

export default DetailsPage;
