import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { addClickedCity } from 'redux/home/homeSlice';

const OtherCitiesList = ({ otherCities, isLoading, error }) => {
  const dispatch = useDispatch();
  const handleClick = (city) => dispatch(addClickedCity(city));
  return (
    <div className="other-cities-section">
      {(!isLoading && !error && otherCities && otherCities.length !== 0)
            && (
            <>
              {otherCities.map((cityItem) => (
                <NavLink
                  key={uuidv4()}
                  to="details"
                  onClick={() => (handleClick(cityItem))}
                >
                  <div className="city-item-box">
                    <BsArrowRightCircle className="next-arrow" />
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

OtherCitiesList.propTypes = {
  // eslint-disable-next-line react/require-default-props
  otherCities: PropTypes.arrayOf(PropTypes.shape({})),
  // eslint-disable-next-line react/require-default-props
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.string,
};
