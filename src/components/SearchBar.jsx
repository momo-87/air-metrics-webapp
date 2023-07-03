import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowBarDown } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedCity, getData, getSelectedCityData } from 'redux/home/homeSlice';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const [displayStyle, setDisplayStyle] = useState('flex');

  // Handle Onchange event
  const handleInput = (e) => {
    // Check if the input value has at least one letter
    if (e.target.value.replace(/[^a-zA-Z]/g, '').length !== 0) {
      setInputValue(e.target.value);
      setDisplayStyle('flex');
    }
    if (e.target.value.length === 0) {
      setInputValue('');
    }
  };

  // Dispatch getSelectedCity to get the selected city from API
  useEffect(() => {
    dispatch(getSelectedCity(inputValue));
  }, [dispatch, inputValue]);

  // Access selected city the data from the Redux store using useSelector
  const { selectedCities } = useSelector(getData);

  // Handle onClick event when the user clicks on the selected city
  const handleCityClick = (option) => {
    setInputValue(option);
  };
  // Handle onBlur event (when the input loses focus)
  const handleInputBlur = () => {
    dispatch(getSelectedCity(inputValue));
    if (selectedCities && selectedCities.length > 0) {
      const { lat, lon, name } = selectedCities[0];
      dispatch(getSelectedCityData({ lat, lon, name }));
    }
    // Remode the option list
    setDisplayStyle('none');
  };
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter Location"
        value={inputValue}
        onInput={handleInput}
        onBlur={handleInputBlur}
      />
      <ul className="options-list" style={{ display: displayStyle }}>
        {selectedCities && selectedCities.map((city) => (
          <NavLink
            type="button"
            key={uuidv4()}
            onClick={() => handleCityClick(city.name)}
          >
            {city.name}
          </NavLink>
        ))}
      </ul>
      <BsArrowBarDown className="search-icon" />
    </div>
  );
};

export default SearchBar;
