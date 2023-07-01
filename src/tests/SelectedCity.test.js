import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SelectedCity from 'components/SelectedCity';
import data from './data';

const reducer = (
  state = {
    home: { home: data },
  },
) => state;

const store = configureStore({ reducer });
describe('SelectedCity test', () => {
  it('will test SelectedCity rendering', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SelectedCity />
        </Provider>
      </MemoryRouter>,
    );
  });
});
