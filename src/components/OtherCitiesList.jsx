import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getData, addClickedCity } from 'redux/home/homeSlice';

const OtherCitiesList = () => {
  const { otherCities, isLoading, error } = useSelector(getData);
  const dispatch = useDispatch();
  const handleClick = (city) => dispatch(addClickedCity(city));
  return (
    <div className="other-cities-section">
      {(!isLoading && !error)
            && (
            <>
              {otherCities.map((cityItem) => (
                <NavLink
                  key={uuidv4()}
                  to="details"
                  onClick={() => (handleClick(cityItem))}
                >
                  <div className="city-item-box">
                    <div className="weather-box">
                      <div className="image-box">
                        <img src={`https://download.spinetix.com/content/widgets/icons/weather/${cityItem.weather.icon}.png`} alt="weather icon" />
                      </div>
                      <div className="weather-details">
                        <div className="temp-box">
                          T:
                          {' '}
                          {cityItem.weather.temp}
                          °
                        </div>
                        <div className="hu-box">
                          hu:
                          {' '}
                          {cityItem.weather.hu}
                          %
                        </div>
                        <div className="ws-box">
                          ws:
                          {' '}
                          {cityItem.weather.ws}
                          m/s
                        </div>
                      </div>
                    </div>
                    <div className="aqi-box">
                      <h1>{cityItem.city}</h1>
                      <p>
                        AQI:
                        {' '}
                        {cityItem.aqi}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </>
            )}
    </div>
  );
};

export default OtherCitiesList;
