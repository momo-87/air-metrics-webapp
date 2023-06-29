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
    // Fetch Nearest City data
    const idendificationResp = await axios.get(NEAREST_CITY_URL.IDENTIFICATION_URL);
    const country = idendificationResp.data.country_name;
    const state = idendificationResp.data.state_prov;
    const cityName = idendificationResp.data.city;
    const coordResp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const { lat, lon } = coordResp.data[0];
    const pollutionResp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const airPollutionIndex = pollutionResp.data.list[0].main.aqi;
    let pollutionLevel = '';

    // Fetch other cities data
    // const coords = [
    //   { lat, lon: lon + 0.5 },
    //   { lat, lon: lon - 0.5 },
    //   { lat: lat + 0.5, lon },
    //   { lat: lat - 0.5, lon },
    //   { lat: lat + 0.5, lon: lon + 0.5 },
    //   { lat: lat - 0.5, lon: lon - 0.5 },
    //   { lat: lat + 0.5, lon: lon - 0.5 },
    //   { lat: lat - 0.5, lon: lon + 0.5 },
    // ];

    // const otherCities = [];

    // const requests = coords.map(async (coord) => {
    //   const cityResp = axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coord.lat}&lon=${coord.lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    //   const pollutionResp = axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    //   const weatherResp = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);

    //   const [cityData, pollutionData, weatherData] = await Promise.all([
    //     cityResp, pollutionResp, weatherResp]);

    //   const city = {
    //     city: cityData.data[0].name,
    //     aqi: pollutionData.data.list[0].main.aqi,
    //     pollution: pollutionData.data.list[0].components,
    //     weather: {
    //       temp: weatherData.data.main.temp,
    //       hu: weatherData.data.main.humidity,
    //       ws: weatherData.data.wind.speed,
    //       icon: weatherData.data.weather[0].icon,
    //     },
    //   };

    //   return city;
    // });

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
    // const getOtherCities = async (coords) => {
    // const otherCities = [];
    // coords.forEach(async (coord) => {
    //   const cityResp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coord.lat}&lon=${coord.lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    //   const pollutionResp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    //   const weatherResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
    //   const city = {
    //     city: cityResp.data[0].name,
    //     aqi: pollutionResp.data.list[0].main.aqi,
    //     pollution: pollutionResp.data.list[0].components,
    //     weather: {
    //       temp: weatherResp.data.main.temp,
    //       hu: weatherResp.data.main.humidity,
    //       ws: weatherResp.data.wind.speed,
    //       icon: weatherResp.data.weather[0].icon,
    //     },
    //   };
    //   otherCities.push(city);
    // });
    // console.log(otherCities);
    // return [...otherCities];
    // };
    // const otherCities = await getOtherCities(coords);
    // console.log(otherCities[0]);

    // const a = await getOtherCities(coords);

    // console.log(a);

    // city 1
    const otherCities = [];
    const city1Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0].lat}&lon=${coords[0].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution1Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[0].lat}&lon=${coords[0].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    const city2Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[1].lat}&lon=${coords[1].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution2Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[1].lat}&lon=${coords[1].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    const city3Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[2].lat}&lon=${coords[2].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution3Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[2].lat}&lon=${coords[2].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    const city4Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[3].lat}&lon=${coords[3].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution4Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[3].lat}&lon=${coords[3].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    const city5Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[4].lat}&lon=${coords[4].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution5Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[4].lat}&lon=${coords[4].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    const city6Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[5].lat}&lon=${coords[5].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution6Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[5].lat}&lon=${coords[5].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    const city7Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[6].lat}&lon=${coords[6].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution7Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[6].lat}&lon=${coords[6].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    const city8Resp = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[7].lat}&lon=${coords[7].lon}&limit=1&appid=c435ab8224ec4a9e751a3469cb551dde`);
    const pollution8Resp = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords[7].lat}&lon=${coords[7].lon}&appid=c435ab8224ec4a9e751a3469cb551dde`);
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
    // Promise.all(requests)
    //   .then((cities) => {
    //     otherCities.push(...cities);
    //     return otherCities;
    //   });
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
  otherCities: [
    {
      city: 'Mengang',
      aqi: 1,
      pollutionLevel: 'Good',
      pollution: {
        co: 383.85,
        no: 0.01,
        no2: 0.14,
        o3: 37.19,
        so2: 0.06,
        pm2_5: 1.3,
        pm10: 1.96,
        nh3: 0.05,
      },
      weather: {
        temp: 302.43,
        hu: 48,
        ws: 2.27,
        icon: '04d',
      },
    },
    {
      city: 'Matomb',
      pollutionLevel: 'Good',
      aqi: 1,
      pollution: {
        co: 387.19,
        no: 0.01,
        no2: 0.17,
        o3: 35.76,
        so2: 0.09,
        pm2_5: 2.87,
        pm10: 3.47,
        nh3: 0.04,
      },
      weather: {
        temp: 298.7,
        hu: 68,
        ws: 4.36,
        icon: '04d',
      },
    },
    {
      city: "Sa'a",
      pollutionLevel: 'Good',
      aqi: 1,
      pollution: {
        co: 397.21,
        no: 0.01,
        no2: 0.4,
        o3: 31.47,
        so2: 0.13,
        pm2_5: 3.45,
        pm10: 4.11,
        nh3: 0.18,
      },
      weather: {
        temp: 299.2,
        hu: 68,
        ws: 3.71,
        icon: '04d',
      },
    },

    {
      city: 'Mbalmayo',
      aqi: 1,
      pollutionLevel: 'Good',
      pollution: {
        co: 397.21,
        no: 0,
        no2: 0.14,
        o3: 30.4,
        so2: 0.08,
        pm2_5: 2.85,
        pm10: 3.42,
        nh3: 0.03,
      },
      weather: {
        temp: 299.2,
        hu: 68,
        ws: 3.71,
        icon: '04d',
      },
    },
    {
      city: 'Nkoteng',
      aqi: 1,
      pollutionLevel: 'Good',
      pollution: {
        co: 383.85,
        no: 0.01,
        no2: 0.16,
        o3: 36.84,
        so2: 0.05,
        pm2_5: 1.14,
        pm10: 1.35,
        nh3: 0.1,
      },
      weather: {
        temp: 302.43,
        hu: 48,
        ws: 2.27,
        icon: '04d',
      },
    },
    {
      city: 'Mvengue',
      aqi: 1,
      pollutionLevel: 'Good',
      pollution: {
        co: 403.88,
        no: 0.01,
        no2: 0.19,
        o3: 27.18,
        so2: 0.11,
        pm2_5: 3.81,
        pm10: 3.99,
        nh3: 0.02,
      },
      weather: {
        temp: 295.81,
        hu: 91,
        ws: 1.41,
        icon: '10d',
      },
    },
    {
      city: 'Bokito',
      aqi: 1,
      pollutionLevel: 'Good',
      pollution: {
        co: 380.52,
        no: 0.02,
        no2: 0.31,
        o3: 20.03,
        so2: 0.07,
        pm2_5: 2.84,
        pm10: 3.47,
        nh3: 0.07,
      },
      weather: {
        temp: 296.16,
        hu: 94,
        ws: 0.2,
        icon: '10d',
      },
    },
    {
      city: 'Zoétélé',
      aqi: 1,
      pollutionLevel: 'Good',
      pollution: {
        co: 410.56,
        no: 0,
        no2: 0.18,
        o3: 22.53,
        so2: 0.14,
        pm2_5: 2.56,
        pm10: 3.06,
        nh3: 0.01,
      },
      weather: {
        temp: 294.62,
        hu: 92,
        ws: 1.38,
        icon: '04d',
      },
    },
  ],
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
        state.city = action.payload.city;
        state.otherCities = [...action.payload.otherCities];
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
