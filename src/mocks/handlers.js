// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const cityIdentificationResp = {
  data: {
    country_name: 'Cameroon',
    state_prov: 'Centre',
    city: 'Yaounde',
  },
};
const handlercityIdentification = rest.get('https://api.ipgeolocation.io/ipgeo?&apiKey=8f0321e938094cc49488159b0f75cc88', (req, res, ctx) => res(
  ctx.json(cityIdentificationResp),
));

const cityCoordsResp = {
  data: [{ lat: 3, lon: 13 }],
};
const cityName = cityIdentificationResp.data.city;
const handlercityCoords = rest.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`, (req, res, ctx) => res(
  ctx.json(cityCoordsResp),
));

const pollutionResp = {
  data: {
    list: [{
      main: {
        aqi: 3,
      },
      components: {
        co2: 10,
        co3: 10,
        co: 10,
        co4: 10,
      },
    }],
  },
};
const { lat, lon } = cityCoordsResp.data[0];
const handlerWeather = rest.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`, (req, res, ctx) => res(
  ctx.json(pollutionResp),
));

const weatherResp = {
  data: {
    main: {
      tp: 10,
      hu: 10,
      ws: 10,
    },
    weather: [{ icon: 'icon' }],
  },
};
const handlerPollution = rest.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`, (req, res, ctx) => res(
  ctx.json(weatherResp),
));

export {
  handlercityIdentification, handlercityCoords, handlerPollution, handlerWeather,
};
