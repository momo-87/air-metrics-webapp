import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const COUNTRIES_URL = 'http://api.airvisual.com/v2/countries?key=3e2c53be-1226-4e2c-b398-84cc48b380dc';
export const getCountries = createAsyncThunk('data/getCountries', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(COUNTRIES_URL);
    // response.data from axios request is the entire API data
    return response.data.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch countries data !!');
  }
});

const initialState = {
  data: {
    countries: [],
    states: [],
    cities: [],
  },
  isLoading: true,
  error: undefined,
};

const homeSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        action.payload.forEach((elt) => {
          state.data.countries.push(Object.values(elt)[0]);
        });
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const getData = (state) => (state.data.cities);
export default homeSlice.reducer;
