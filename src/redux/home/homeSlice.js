import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const NEAREST_CITY_URL = 'http: //api.airvisual.com/v2/
// nearest_city?key=3e2c53be-1226-4e2c-b398-84cc48b380dc';
// export const getNearestCityData = createAsyncThunk('data/getNearestCityData',
// async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(NEAREST_CITY_URL);
//     return response.data.data;
//   } catch (error) {
//     return rejectWithValue('Failed to fetch nearest city data !!');
//   }
// });

const NEAREST_CITY_URL = {
  IDENTIFICATION_URL: 'https://api.ipgeolocation.io/ipgeo?&apiKey=8f0321e938094cc49488159b0f75cc88',
  // POLLUTION_URL:  'http: //api.openweathermap.org/data/2.5/air_pollution?
  // lat=3.8689867&lon=11.5213344&appid=c435ab8224ec4a9e751a3469cb551dde',
  WEATHER_URL: 'https: //api.openweathermap.org/data/2.5/weather?lat=3.8689867&lon=11.5213344&appid=c435ab8224ec4a9e751a3469cb551dde',

};
export const getNearestCityData = createAsyncThunk('data/getNearestCityData', async (_, { rejectWithValue }) => {
  try {
    const idendificationResp = await axios.get(NEAREST_CITY_URL.IDENTIFICATION_URL);
    const cityName = idendificationResp.data.city;
    const coordResp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const { lat, lon } = coordResp.data[0];
    const pollutionResp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const airPollutionIndex = pollutionResp.data.list[0].main.aqi;
    let pollutionLevel = '';
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
        country: idendificationResp.data.country_name,
        state: idendificationResp.data.state_prov,
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
      }

    );
  } catch (error) {
    return rejectWithValue('Failed to fetch nearest city data !!');
  }
});

// Fetc defaults data
// export const getOtherCitiesData = createAsyncThunk('data/getOtherCitiesData',
// async (_, { rejectWithValue }) => {
//   try {
//     const newYorkResponse = await axios.get('http: //api.airvisual.com/v2/city?city=
// new york city&state=new york&country=usa&key=3e2c53be-1226-4e2c-b398-84cc48b380dc');
//     const lagosResponse = await axios.get('http: //api.airvisual.com/v2/
// city?city=lagos&state=lagos&country=nigeria&key=3e2c53be-1226-4e2c-b398-84cc48b380dc');
//     const parisResponse = await axios.get('http: //api.airvisual.com/v2/city?
// city=paris&state=ile-de-france&country=france&key=3e2c53be-1226-4e2c-b398-84cc48b380dc');
//     const beijingResponse = await axios.get('http: //api.airvisual.com/v2/city?
// city=beijing&state=beijing&country=china&key=3e2c53be-1226-4e2c-b398-84cc48b380dc');
//     const pretoriaResponse = await axios.get('http: //api.airvisual.com/v2/city?
// city=pretoria&state=gauteng&country=south africa&key=3e2c53be-1226-4e2c-b398-84cc48b380dc');
//     const tokyoResponse = await axios.get('http: //api.airvisual.com/v2/city?city
// =tokyo&state=tokyo&country=japan&key=3e2c53be-1226-4e2c-b398-84cc48b380dc');
//     const newYorkResponse = await axios.get('http: //api.airvisual.com/v2/city?city=
// new york city&state=new york&country=usa&key=3e2c53be-1226-4e2c-b398-84cc48b380dc');

//     return [
//       newYorkResponse.data.data,
//       lagosResponse.data.data,
//       parisResponse.data.data,
//       beijingResponse.data.data,
//       pretoriaResponse.data.data,
//       tokyoResponse.data.data,
//     ];
//   } catch (error) {
//     return rejectWithValue('Failed to fetch other cities data !!');
//   }
// });

const initialState = {
  city: {
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
  },
  OtherCities: [],
  isLoading: true,
  error: undefined,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNearestCityData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getNearestCityData.fulfilled, (state, action) => {
        state.city = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getNearestCityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  //   .addCase(getOtherCitiesData.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = undefined;
  //   })
  //   .addCase(getOtherCitiesData.fulfilled, (state, action) => {
  //     action.payload.forEach((item) => {
  //       const newCity = {
  //         country:  item.country,
  //         state:  item.state,
  //         city:  item.city,
  //         aqius:  item.current.pollution.aqius,
  //         temp:  item.current.weather.tp,
  //         pres:  item.current.weather.pr,
  //         hu:  item.current.weather.hu,
  //         ws:  item.current.weather.ws,
  //         wd:  item.current.weather.wd,
  //         icon:  item.current.weather.ic,
  //       };
  //       state.OtherCities.push(newCity);
  //     });
  //     state.isLoading = false;
  //     state.error = undefined;
  //   });
  },
});

export const getData = (state) => (state.home);
export default homeSlice.reducer;
