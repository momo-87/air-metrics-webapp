import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NEAREST_CITY_URL = 'http://api.airvisual.com/v2/nearest_city?key=3e2c53be-1226-4e2c-b398-84cc48b380dc';
export const getNearestCityData = createAsyncThunk('data/getNearestCityData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(NEAREST_CITY_URL);
    // response.data from axios request is the entire API data
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch nearest city data !!');
  }
});

const initialState = {
  city: {
    city: 'Douala',
    state: 'Littoral',
    country: 'Cameroon',
    aqius: 65,
    temp: 22,
    pres: 1013,
    hu: 98,
    ws: 0.58,
    wd: 153,
    icon: '10d',
  },
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
        state.city.aqius = action.payload.current.pollution.aqius;
        state.city.temp = action.payload.current.weather.tp;
        state.city.pres = action.payload.current.weather.pr;
        state.city.hu = action.payload.current.weather.hu;
        state.city.ws = action.payload.current.weather.ws;
        state.city.wd = action.payload.current.weather.wd;
        state.city.icon = action.payload.current.weather.ic;
        state.isLoading = false;
        state.error = undefined;
      });
  },
});

export const getData = (state) => (state.home);
export default homeSlice.reducer;
