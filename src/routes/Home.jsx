import NearestCity from 'components/NearestCity';
import OtherCitiesList from 'components/OtherCitiesList';
// import SelectedCity from 'components/SelectedCity';
import SearchBar from 'components/SearchBar';
import Footer from 'components/Footer';
import { getData } from 'redux/home/homeSlice';
import { useSelector } from 'react-redux';

const Home = () => {
  const {
    city, selectedCity, isLoading, error, otherCities,
  } = useSelector(getData);
  return (
    <div className="home">
      <SearchBar />
      <NearestCity
        city={city}
        selectedCity={selectedCity}
        isLoading={isLoading}
        error={error}
      />
      <OtherCitiesList otherCities={otherCities} isLoading={isLoading} error={error} />
      <Footer />
    </div>
  );
};

export default Home;
