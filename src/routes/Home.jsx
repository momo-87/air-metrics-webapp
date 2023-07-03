import NearestCity from 'components/NearestCity';
import OtherCitiesList from 'components/OtherCitiesList';
import SelectedCity from 'components/SelectedCity';
import SearchBar from 'components/SearchBar';
import { getData } from 'redux/home/homeSlice';
import { useSelector } from 'react-redux';

const Home = () => {
  const {
    city, selectedCity, isLoading, error, otherCities,
  } = useSelector(getData);
  return (
    <div className="home">
      <SearchBar />
      {selectedCity && Object.keys(selectedCity).length !== 0 ? <SelectedCity />
        : <NearestCity city={city} isLoading={isLoading} error={error} /> }
      <OtherCitiesList otherCities={otherCities} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Home;
