import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNearestCityData = createAsyncThunk('home/getNearestCityData', async (_, { rejectWithValue }) => {
  try {
    const idendificationResp = await axios.get('https://api.ipgeolocation.io/ipgeo?&apiKey=8f0321e938094cc49488159b0f75cc88');
    const country = idendificationResp.data.country_name;
    const state = idendificationResp.data.state_prov;
    const cityName = idendificationResp.data.city;
    const coordResp = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const { lat, lon } = coordResp.data[0];
    const pollutionResp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const airPollutionIndex = pollutionResp.data.list[0].main.aqi;
    let pollutionLevel = '';

    // Fetch Nearest City data start
    const coords = [
      { lat, lon: lon + 0.5 },
      { lat, lon: lon - 0.5 },
      { lat: lat + 0.5, lon },
      { lat: lat - 0.5, lon },
      { lat: lat + 0.5, lon: lon + 0.5 },
      { lat: lat - 0.5, lon: lon - 0.5 },
      { lat: lat + 0.5, lon: lon - 0.5 },
      { lat: lat - 0.5, lon: lon + 0.5 },
    ];

    // city 1
    const otherCities = [];
    const city1Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0].lat}&lon=${coords[0].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution1Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[0].lat}&lon=${coords[0].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather1Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0].lat}&lon=${coords[0].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city1Resp && pollution1Resp && weather1Resp) {
      const city1 = {
        city: city1Resp.data[0].name,
        aqi: pollution1Resp.data.list[0].main.aqi,
        pollution: pollution1Resp.data.list[0].components,
        weather: {
          temp: weather1Resp.data.main.temp,
          hu: weather1Resp.data.main.humidity,
          ws: weather1Resp.data.wind.speed,
          icon: weather1Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city1);
    }

    // city 2
    const city2Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[1].lat}&lon=${coords[1].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution2Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[1].lat}&lon=${coords[1].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather2Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[1].lat}&lon=${coords[1].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city2Resp && pollution2Resp && weather2Resp) {
      const city2 = {
        city: city2Resp.data[0].name,
        aqi: pollution2Resp.data.list[0].main.aqi,
        pollution: pollution2Resp.data.list[0].components,
        weather: {
          temp: weather2Resp.data.main.temp,
          hu: weather2Resp.data.main.humidity,
          ws: weather2Resp.data.wind.speed,
          icon: weather2Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city2);
    }

    // city 3
    const city3Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[2].lat}&lon=${coords[2].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution3Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[2].lat}&lon=${coords[2].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather3Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[2].lat}&lon=${coords[2].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city3Resp && pollution3Resp && weather3Resp) {
      const city3 = {
        city: city3Resp.data[0].name,
        aqi: pollution3Resp.data.list[0].main.aqi,
        pollution: pollution3Resp.data.list[0].components,
        weather: {
          temp: weather3Resp.data.main.temp,
          hu: weather3Resp.data.main.humidity,
          ws: weather3Resp.data.wind.speed,
          icon: weather3Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city3);
    }

    // city 4
    const city4Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[3].lat}&lon=${coords[3].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution4Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[3].lat}&lon=${coords[3].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather4Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[3].lat}&lon=${coords[3].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city4Resp && pollution4Resp && weather4Resp) {
      const city4 = {
        city: city4Resp.data[0].name,
        aqi: pollution4Resp.data.list[0].main.aqi,
        pollution: pollution4Resp.data.list[0].components,
        weather: {
          temp: weather4Resp.data.main.temp,
          hu: weather4Resp.data.main.humidity,
          ws: weather4Resp.data.wind.speed,
          icon: weather4Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city4);
    }

    // city 5
    const city5Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[4].lat}&lon=${coords[4].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution5Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[4].lat}&lon=${coords[4].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather5Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[4].lat}&lon=${coords[4].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city5Resp && pollution5Resp && weather5Resp) {
      const city5 = {
        city: city5Resp.data[0].name,
        aqi: pollution5Resp.data.list[0].main.aqi,
        pollution: pollution5Resp.data.list[0].components,
        weather: {
          temp: weather5Resp.data.main.temp,
          hu: weather5Resp.data.main.humidity,
          ws: weather5Resp.data.wind.speed,
          icon: weather5Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city5);
    }

    // city 6
    const city6Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[5].lat}&lon=${coords[5].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution6Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[5].lat}&lon=${coords[5].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather6Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[5].lat}&lon=${coords[5].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city6Resp && pollution6Resp && weather6Resp) {
      const city6 = {
        city: city6Resp.data[0].name,
        aqi: pollution6Resp.data.list[0].main.aqi,
        pollution: pollution6Resp.data.list[0].components,
        weather: {
          temp: weather6Resp.data.main.temp,
          hu: weather6Resp.data.main.humidity,
          ws: weather6Resp.data.wind.speed,
          icon: weather6Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city6);
    }

    // city 7
    const city7Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[6].lat}&lon=${coords[6].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution7Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[6].lat}&lon=${coords[6].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather7Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[6].lat}&lon=${coords[6].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city7Resp && pollution7Resp && weather7Resp) {
      const city7 = {
        city: city7Resp.data[0].name,
        aqi: pollution7Resp.data.list[0].main.aqi,
        pollution: pollution7Resp.data.list[0].components,
        weather: {
          temp: weather7Resp.data.main.temp,
          hu: weather7Resp.data.main.humidity,
          ws: weather7Resp.data.wind.speed,
          icon: weather7Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city7);
    }

    // city 8
    const city8Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[7].lat}&lon=${coords[7].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution8Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[7].lat}&lon=${coords[7].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather8Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[7].lat}&lon=${coords[7].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city8Resp && pollution8Resp && weather8Resp) {
      const city8 = {
        city: city8Resp.data[0].name,
        aqi: pollution8Resp.data.list[0].main.aqi,
        pollution: pollution8Resp.data.list[0].components,
        weather: {
          temp: weather8Resp.data.main.temp,
          hu: weather8Resp.data.main.humidity,
          ws: weather8Resp.data.wind.speed,
          icon: weather8Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city8);
    }
    // Fetch Nearest City data End

    switch (airPollutionIndex) {
      case 1:
        pollutionLevel = 'Good';
        break;
      case 2:
        pollutionLevel = 'Fair';
        break;
      case 3:
        pollutionLevel = 'Moderate';
        break;
      case 4:
        pollutionLevel = 'Poor';
        break;
      case 5:
        pollutionLevel = 'Very Poor';
        break;
      default:
        pollutionLevel = '';
    }
    return (
      {
        city: {
          country,
          state,
          city: cityName,
          aqi: airPollutionIndex,
          pollutionLevel,
          pollution: pollutionResp.data.list[0].components,
          weather: {
            temp: weatherResp.data.main.temp,
            hu: weatherResp.data.main.humidity,
            ws: weatherResp.data.wind.speed,
            icon: weatherResp.data.weather[0].icon,
          },
        },
        otherCities,
      }
    );
  } catch (error) {
    return rejectWithValue('Your Location is not supported !!');
  }
});

export const getSelectedCity = createAsyncThunk('home/getUserInputData', async (userInput, { rejectWithValue }) => {
  try {
    let cities = [];
    if (userInput) {
      const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=c435ab8224ec4a9e751a3469cb551dde`;
      const resp = await axios.get(URL);
      cities = resp.data;
    }
    return cities;
  } catch (error) {
    return rejectWithValue('City not supported');
  }
});

export const getSelectedCityData = createAsyncThunk('home/getSelectedCityData', async ({ lat, lon, name }, { rejectWithValue }) => {
  try {
    const pollutionResp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const airPollutionIndex = pollutionResp.data.list[0].main.aqi;
    let pollutionLevel = '';

    // Fetch Nearest City data start
    const coords = [
      { lat, lon: lon + 0.5 },
      { lat, lon: lon - 0.5 },
      { lat: lat + 0.5, lon },
      { lat: lat - 0.5, lon },
      { lat: lat + 0.5, lon: lon + 0.5 },
      { lat: lat - 0.5, lon: lon - 0.5 },
      { lat: lat + 0.5, lon: lon - 0.5 },
      { lat: lat - 0.5, lon: lon + 0.5 },
    ];

    // city 1
    const otherCities = [];
    const city1Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0].lat}&lon=${coords[0].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution1Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[0].lat}&lon=${coords[0].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather1Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0].lat}&lon=${coords[0].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city1Resp && pollution1Resp && weather1Resp) {
      const city1 = {
        city: city1Resp.data[0].name,
        aqi: pollution1Resp.data.list[0].main.aqi,
        pollution: pollution1Resp.data.list[0].components,
        weather: {
          temp: weather1Resp.data.main.temp,
          hu: weather1Resp.data.main.humidity,
          ws: weather1Resp.data.wind.speed,
          icon: weather1Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city1);
    }

    // city 2
    const city2Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[1].lat}&lon=${coords[1].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution2Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[1].lat}&lon=${coords[1].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather2Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[1].lat}&lon=${coords[1].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city2Resp && pollution2Resp && weather2Resp) {
      const city2 = {
        city: city2Resp.data[0].name,
        aqi: pollution2Resp.data.list[0].main.aqi,
        pollution: pollution2Resp.data.list[0].components,
        weather: {
          temp: weather2Resp.data.main.temp,
          hu: weather2Resp.data.main.humidity,
          ws: weather2Resp.data.wind.speed,
          icon: weather2Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city2);
    }

    // city 3
    const city3Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[2].lat}&lon=${coords[2].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution3Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[2].lat}&lon=${coords[2].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather3Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[2].lat}&lon=${coords[2].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city3Resp && pollution3Resp && weather3Resp) {
      const city3 = {
        city: city3Resp.data[0].name,
        aqi: pollution3Resp.data.list[0].main.aqi,
        pollution: pollution3Resp.data.list[0].components,
        weather: {
          temp: weather3Resp.data.main.temp,
          hu: weather3Resp.data.main.humidity,
          ws: weather3Resp.data.wind.speed,
          icon: weather3Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city3);
    }

    // city 4
    const city4Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[3].lat}&lon=${coords[3].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution4Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[3].lat}&lon=${coords[3].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather4Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[3].lat}&lon=${coords[3].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city4Resp && pollution4Resp && weather4Resp) {
      const city4 = {
        city: city4Resp.data[0].name,
        aqi: pollution4Resp.data.list[0].main.aqi,
        pollution: pollution4Resp.data.list[0].components,
        weather: {
          temp: weather4Resp.data.main.temp,
          hu: weather4Resp.data.main.humidity,
          ws: weather4Resp.data.wind.speed,
          icon: weather4Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city4);
    }

    // city 5
    const city5Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[4].lat}&lon=${coords[4].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution5Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[4].lat}&lon=${coords[4].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather5Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[4].lat}&lon=${coords[4].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city5Resp && pollution5Resp && weather5Resp) {
      const city5 = {
        city: city5Resp.data[0].name,
        aqi: pollution5Resp.data.list[0].main.aqi,
        pollution: pollution5Resp.data.list[0].components,
        weather: {
          temp: weather5Resp.data.main.temp,
          hu: weather5Resp.data.main.humidity,
          ws: weather5Resp.data.wind.speed,
          icon: weather5Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city5);
    }

    // city 6
    const city6Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[5].lat}&lon=${coords[5].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution6Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[5].lat}&lon=${coords[5].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather6Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[5].lat}&lon=${coords[5].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city6Resp && pollution6Resp && weather6Resp) {
      const city6 = {
        city: city6Resp.data[0].name,
        aqi: pollution6Resp.data.list[0].main.aqi,
        pollution: pollution6Resp.data.list[0].components,
        weather: {
          temp: weather6Resp.data.main.temp,
          hu: weather6Resp.data.main.humidity,
          ws: weather6Resp.data.wind.speed,
          icon: weather6Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city6);
    }

    // city 7
    const city7Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[6].lat}&lon=${coords[6].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution7Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[6].lat}&lon=${coords[6].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather7Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[6].lat}&lon=${coords[6].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city7Resp && pollution7Resp && weather7Resp) {
      const city7 = {
        city: city7Resp.data[0].name,
        aqi: pollution7Resp.data.list[0].main.aqi,
        pollution: pollution7Resp.data.list[0].components,
        weather: {
          temp: weather7Resp.data.main.temp,
          hu: weather7Resp.data.main.humidity,
          ws: weather7Resp.data.wind.speed,
          icon: weather7Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city7);
    }

    // city 8
    const city8Resp = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords[7].lat}&lon=${coords[7].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution8Resp = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[7].lat}&lon=${coords[7].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weather8Resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[7].lat}&lon=${coords[7].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    if (city8Resp && pollution8Resp && weather8Resp) {
      const city8 = {
        city: city8Resp.data[0].name,
        aqi: pollution8Resp.data.list[0].main.aqi,
        pollution: pollution8Resp.data.list[0].components,
        weather: {
          temp: weather8Resp.data.main.temp,
          hu: weather8Resp.data.main.humidity,
          ws: weather8Resp.data.wind.speed,
          icon: weather8Resp.data.weather[0].icon,
        },
      };
      otherCities.push(city8);
    }
    // Fetch Nearest City data End

    switch (airPollutionIndex) {
      case 1:
        pollutionLevel = 'Good';
        break;
      case 2:
        pollutionLevel = 'Fair';
        break;
      case 3:
        pollutionLevel = 'Moderate';
        break;
      case 4:
        pollutionLevel = 'Poor';
        break;
      case 5:
        pollutionLevel = 'Very Poor';
        break;
      default:
        pollutionLevel = '';
    }
    return (
      {
        city: {
          city: name,
          aqi: airPollutionIndex,
          pollutionLevel,
          pollution: pollutionResp.data.list[0].components,
          weather: {
            temp: weatherResp.data.main.temp,
            hu: weatherResp.data.main.humidity,
            ws: weatherResp.data.wind.speed,
            icon: weatherResp.data.weather[0].icon,
          },
        },
        otherCities,
      }
    );
  } catch (error) {
    return rejectWithValue('Your Location is not supported !!');
  }
});

const initialState = {
  city: { },
  otherCities: [],
  isLoading: true,
  error: undefined,
  clickedCity: {},
  selectedCities: [],
  selectedCity: {},
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addClickedCity: (state, action) => {
      state.clickedCity = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNearestCityData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getNearestCityData.fulfilled, (state, action) => {
        state.city = action.payload.city;
        state.otherCities = [...action.payload.otherCities];
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getNearestCityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getSelectedCity.fulfilled, (state, action) => {
        state.selectedCities = [...action.payload];
      })

      .addCase(getSelectedCityData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getSelectedCityData.fulfilled, (state, action) => {
        state.selectedCity = action.payload.city;
        state.otherCities = [...action.payload.otherCities];
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getSelectedCityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const getData = (state) => (state.home);
export const { addClickedCity } = homeSlice.actions;
export default homeSlice.reducer;
