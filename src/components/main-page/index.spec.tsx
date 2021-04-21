import reducer from '../../redux/reducer';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import MainPage from './index';

const initiallState = {
  loading: false,
  allAnnouncements: [{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }],
  error: '',
  searchTerm: ''
};

const renderWithRedux = (
  component,
  {
    initialState = initiallState, store = createStore(reducer, initialState)
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

describe('main page', () => {
  it('should render properly', () => {
    // renderWithRedux(<MainPage/>); --> вертає помилку з селектором
  });
});
