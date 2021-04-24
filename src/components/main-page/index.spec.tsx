import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from './index';
import {
  searchAnnouncement
} from '../../redux/actions';
import rootReducer from '../../redux/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// { id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }

jest.mock('../../redux/actions', () => ({
  ...jest.requireActual('../../redux/actions'),
  fetchAnnouncement: jest.fn().mockReturnValue({ type: 'fetch' }),
  addAnnouncement: jest.fn().mockReturnValue({ type: 'add' }),
  deleteAnnouncement: jest.fn().mockReturnValue({ type: 'delete' }),
  editAnnouncement: jest.fn().mockReturnValue({ type: 'edit' })
}));

const initiallState = {
  loading: false,
  allAnnouncements: [],
  error: '',
  searchTerm: ''
};

function renderWithRedux (
  ui: any, initialState: any
) {
  const store = createStore(
    rootReducer,
    { allAnnouncements: initialState },
    composeWithDevTools(applyMiddleware(thunk))
  );
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
    dispatchSpy
  };
}

describe('main page', () => {
  it('should render properly', () => {
    const { getByText, dispatchSpy } = renderWithRedux(<MainPage/>, initiallState);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'fetch' });
    expect(dispatchSpy).toHaveBeenCalledWith(searchAnnouncement(''));
    expect(getByText('My Announcements')).toBeInTheDocument();
  });

  it('should render 1 item', () => {
    const state = {
      ...initiallState,
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }]
    };
    const { getByText, getByTitle, getByRole, dispatchSpy } = renderWithRedux(<MainPage/>, state);

    expect(getByText('test1')).toBeInTheDocument();
    const showAll = getByTitle('Show All');
    fireEvent.click(showAll);
    const search = getByRole('searchField');
    fireEvent.change(search, { target: { value: 'test1' } });
    expect(search).toHaveValue('test1');
    expect(dispatchSpy).toHaveBeenCalledWith(searchAnnouncement('test1'));
  });
  it('should delete announcement', () => {
    const state = {
      ...initiallState,
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }]
    };
    const { dispatchSpy, getByRole } = renderWithRedux(<MainPage/>, state);
    fireEvent.click(getByRole('deleteButton'));
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'fetch' });
    expect(dispatchSpy).toHaveBeenCalledWith(searchAnnouncement(''));
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'delete' });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'fetch' });
  });
  it('should add announcement', () => {
    const state = {
      ...initiallState,
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }]
    };
    const { dispatchSpy, getByTitle } = renderWithRedux(<MainPage/>, state);
    fireEvent.click(getByTitle('Add announcement'));
    const titleInput = screen.getByTestId('addTitle');
    expect(titleInput.textContent).toBe('');
    fireEvent.change(titleInput, { target: { value: 'test2' } });
    expect(titleInput).toHaveValue('test2');
    const descInput = screen.getByTestId('addDescription');
    expect(descInput.textContent).toBe('');
    fireEvent.change(descInput, { target: { value: 'test2' } });
    expect(descInput).toHaveValue('test2');
    const btn = screen.getByRole('submitButton');
    fireEvent.click(btn);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'fetch' });
    expect(dispatchSpy).toHaveBeenCalledWith(searchAnnouncement(''));
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'add' });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'fetch' });
  });
  it('should delete announcement', () => {
    const state = {
      ...initiallState,
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }]
    };
    const { dispatchSpy } = renderWithRedux(<MainPage/>, state);
    fireEvent.click(screen.getByRole('editButton'));
    fireEvent.click(screen.getByRole('submitButton'));
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'fetch' });
    expect(dispatchSpy).toHaveBeenCalledWith(searchAnnouncement(''));
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'edit' });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'fetch' });
  });
  it('should check the spinner', () => {
    const state = {
      ...initiallState,
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
      loading: true
    };
    renderWithRedux(<MainPage/>, state);
    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
  });
});
