// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
import {
  handlercityIdentification, handlercityCoords, handlerPollution, handlerWeather,
} from './handlers';

// This configures a request mocking server with the given request handlers.
const serverCity = setupServer(handlercityIdentification);
const serverCoords = setupServer(handlercityCoords);
const serverPollution = setupServer(handlerPollution);
const serverWeather = setupServer(handlerWeather);

export {
  serverCity, serverCoords, serverPollution, serverWeather,
};
