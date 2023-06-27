import { useSelector } from 'react-redux';
import { getData } from 'redux/home/homeSlice';

const NearestCity = () => {
  const { city, isLoading, error } = useSelector(getData);
  return (
    <div className="Nearest-city-box">
      {isLoading && <p>is Loading...</p>}
      {error && <p>{error}</p>}
      <div className="image_box">
        images box
      </div>
      <div className="infos-box">
        <h1 className="country">{city.country}</h1>
        <h2 className="state">{city.state}</h2>
        <h3 className="city">{city.city}</h3>
        <p>
          Air Quality Index(AQI):
          {' '}
          {city.aqius}
        </p>
        <div className="weather">
          <div>{city.temp}</div>
          <div>{city.pres}</div>
          <div>{city.hu}</div>
          <div>{city.ws}</div>
          <div>{city.wd}</div>
          <div>
            <img src={`https://download.spinetix.com/content/widgets/icons/weather/${city.icon}.png`} alt="weather icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearestCity;
