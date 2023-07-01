import NearestCity from 'components/NearestCity';
import OtherCitiesList from 'components/OtherCitiesList';
import SelectedCity from 'components/SelectedCity';
import { getData } from 'redux/home/homeSlice';
import { useSelector } from 'react-redux';

const Home = () => {
  const {
    city, selectedCity, isLoading, error,
  } = useSelector(getData);
  return (
    <div>
      {selectedCity && Object.keys(selectedCity).length !== 0 ? <SelectedCity />
        : <NearestCity city={city} isLoading={isLoading} error={error} /> }
      <OtherCitiesList />
    </div>
  );
};

export default Home;
