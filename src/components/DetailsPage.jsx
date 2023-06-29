import waterDrop from 'assets/icons/drop.png';

const DetailsPage = () => {
  const city = {
    city: 'Mengang',
    aqi: 1,
    pollutionLevel: 'Good',
    pollution: {
      co: 383.85,
      no: 0.01,
      no2: 0.14,
      o3: 37.19,
      so2: 0.06,
      pm2_5: 1.3,
      pm10: 1.96,
      nh3: 0.05,
    },
    weather: {
      temp: 302.43,
      hu: 48,
      ws: 2.27,
      icon: '04d',
    },
  };
  return (
    <>
      <div className="details-section">
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
      </div>
      <hr />
      <div className="other-pollutants">
        <h2>Others Pollutant Concentrations</h2>
        <p>
          CO:
          {' '}
          {city.pollution.co}
          μg/m
          <sup>3</sup>
        </p>
        <p>
          NO:
          {' '}
          {city.pollution.no}
          μg/m
          <sup>3</sup>
        </p>
        <p>
          NO2:
          {' '}
          {city.pollution.no2}
          μg/m
          <sup>3</sup>
        </p>
        <p>
          O3:
          {' '}
          {city.pollution.o3}
          μg/m
          <sup>3</sup>
        </p>
        <p>
          SO2:
          {' '}
          {city.pollution.so2}
          μg/m
          <sup>3</sup>
        </p>
        <p>
          NH3:
          {' '}
          {city.pollution.nh3}
          μg/m
          <sup>3</sup>
        </p>
      </div>
    </>
  );
};

export default DetailsPage;
