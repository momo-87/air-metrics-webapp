import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import waterDrop from 'assets/icons/drop.png';
import { getData } from 'redux/home/homeSlice';

const DetailsPage = () => {
  const { clickedCity } = useSelector(getData);
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
        clickedCity.pollutionLevel = '';
    }
    return level;
  };

  return (
    <>
      {clickedCity && Object.keys(clickedCity).length === 0 && <p className="no-data">Data Not Found</p>}
      {clickedCity && Object.keys(clickedCity).length !== 0 && (
      <>
        <div className="details-section">
          <NavLink to="/" className="back-arrow-link">
            <BsArrowLeftCircle className="back-arrow" />
          </NavLink>
          <div className="weather-infos-box">
            <div className="weather-icon-box">
              <img src={`https://download.spinetix.com/content/widgets/icons/weather/${clickedCity.weather.icon}.png`} alt="weather icon" />
            </div>
            <div className="weather-data-box">
              <div className="temp-box">
                {clickedCity.weather.temp}
                °
              </div>
              <div className="hu-box">
                <img src={waterDrop} alt="water drop" />
                {clickedCity.weather.hu}
                %
              </div>
              <div className="ws-box">
                ws:
                {' '}
                {clickedCity.weather.ws}
                m/s
              </div>
            </div>
          </div>
          <div className="air-data-box">
            <h1 className="city">
              {clickedCity.city}
              {' '}
              Air Quality Index
            </h1>
            <p className={pollutionLevel(clickedCity.aqi)}>
              {clickedCity.aqi}
            </p>
            <p
              className={pollutionLevel(clickedCity.aqi)}
            >
              {pollutionLevel(clickedCity.aqi)}
              <span className="pollutant">
                PM2.5:
                {' '}
                {clickedCity.pollution.pm2_5}
                μg/m
                <sup>3</sup>
              </span>
              <span className="pollutant">
                PM10:
                {' '}
                {clickedCity.pollution.pm10}
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
            {clickedCity.pollution.co}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            NO:
            {' '}
            {clickedCity.pollution.no}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            NO2:
            {' '}
            {clickedCity.pollution.no2}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            O3:
            {' '}
            {clickedCity.pollution.o3}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            SO2:
            {' '}
            {clickedCity.pollution.so2}
            μg/m
            <sup>3</sup>
          </p>
          <p className="pollutant">
            NH3:
            {' '}
            {clickedCity.pollution.nh3}
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
