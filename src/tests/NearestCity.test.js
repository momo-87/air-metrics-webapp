import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import NearestCity from 'components/NearestCity';

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

const cityObj = {
  country: 'Cameroon',
  state: 'Centre',
  city: 'Yaounde',
  aqi: 1,
  pollutionLevel: 'Good',
  pollution: {
    co: 390.53,
    no: 0.06,
    no2: 0.53,
    o3: 31.11,
    so2: 0.24,
    pm2_5: 1.42,
    pm10: 2.67,
    nh3: 0.35,
  },
  weather: {
    temp: 296.98,
    hu: 75,
    ws: 1.8,
    icon: '04d',
  },
};

test('should render Nearest city component', async () => {
  render(<NearestCity
    city={cityObj}
  />, { wrapper: AllTheProviders });
  expect(screen.getAllByText(/air/i).length).toBe(1);
});
