import { configureStore } from '@reduxjs/toolkit';
import homeReducer from 'redux/home/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default store;
