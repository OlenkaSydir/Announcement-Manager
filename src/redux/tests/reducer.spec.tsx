import React from 'react';
import reducer from '../reducer';
import * as types from '../types';

const initialState = {
  loading: false,
  allAnnouncements: [],
  error: '',
  searchTerm: ''
};

const mockedAnns = [{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }];

describe('reducer', () => {
  it('should return init state', () => {
    expect(reducer(undefined, {})).toEqual(
      initialState
    );
  });
  it('should handle requests', () => {
    expect(reducer(undefined, {
      type: types.ADD_ANNOUNCEMENT_REQUEST
    })).toEqual(
      {
        ...initialState,
        loading: true
      }
    );
    expect(reducer(undefined, {
      type: types.EDIT_ANNOUNCEMENT_REQUEST
    })).toEqual(
      {
        ...initialState,
        loading: true
      }
    );
    expect(reducer(undefined, {
      type: types.FETCH_ANNOUNCEMENT_REQUEST
    })).toEqual(
      {
        ...initialState,
        loading: true
      }
    );
  });
  it('should fetch items', () => {
    expect(reducer(initialState, {
      type: types.FETCH_ANNOUNCEMENT_SUCCESS,
      payload: mockedAnns
    })).toEqual(
      {
        ...initialState,
        loading: false,
        allAnnouncements: mockedAnns
      }
    );
  });
  it('should fail to fetch', () => {
    expect(reducer(initialState, {
      type: types.FETCH_ANNOUNCEMENT_FAILURE,
      payload: 'error'
    })).toEqual(
      {
        ...initialState,
        loading: false,
        error: 'error'
      }
    );
  });
  it('should set searchTerm', () => {
    expect(reducer(initialState, {
      type: types.SEARCH_ANNOUNCEMENT_REQUEST,
      payload: 'qwerty'
    })).toEqual(
      {
        ...initialState,
        loading: false,
        searchTerm: 'qwerty'
      }
    );
  });
});

// import React from 'react';
// import { applyMiddleware, createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { render, screen, fireEvent } from '@testing-library/react';
// import configureStore from 'redux-mock-store';
// import reducer from './reducer';
// import * as types from './types';
// import * as actions from './actions';
// import {
//   selectAllAnnouncements,
//   selectAnnouncementState,
//   selectError,
//   selectFilteredAnns,
//   selectLoading,
//   selectSearchTerm
// } from './selectors';
// import MainPage from './../components/main-page/index';
// import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
// import { baseUrl } from '../shared/constants';
//
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
//
// const renderWithRedux = (
//   component,
//   {
//     initialState, store = createStore(reducer, initialState)
//   } = { }
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store
//   };
// };

// describe('selectors', () => {
//   it('should select search term', () => {
//     const mockParameters = {
//       allAnnouncements: [{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }],
//       error: '',
//       loading: false,
//       searchTerm: 'test1'
//     };
//     const selected = selectSearchTerm.resultFunc(mockParameters);
//     expect(selected).toBe('test1');
//   });
//   it('should select all announcements', () => {
//     const mockParameters = {
//       allAnnouncements: [{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }],
//       error: '',
//       loading: false,
//       searchTerm: ''
//     };
//     const selected = selectAllAnnouncements.resultFunc(mockParameters);
//     expect(selected).toMatchObject([{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }]);
//   });
//   it('should select filtered announcements', () => {
//     const mockParameters = {
//       allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
//       error: '',
//       loading: false,
//       searchTerm: 'test1'
//     };
//     const selected = selectFilteredAnns.resultFunc(mockParameters.allAnnouncements, mockParameters.searchTerm);
//     expect(selected).toMatchObject([{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }]);
//   });
//   it('should select loading state', () => {
//     const mockParameters = {
//       allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
//       error: '',
//       loading: false,
//       searchTerm: 'test1'
//     };
//     const selected = selectLoading.resultFunc(mockParameters);
//     expect(selected).toBe(false);
//   });
//   it('should select error', () => {
//     const mockParameters = {
//       allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
//       error: 'qwerty',
//       loading: false,
//       searchTerm: 'test1'
//     };
//     const selected = selectError.resultFunc(mockParameters);
//     expect(selected).toBe('qwerty');
//   });
//   it('should select init state', () => {
//     const mockParameters = {
//       allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
//       error: 'qwerty',
//       loading: false,
//       searchTerm: 'test1'
//     };
//     const selected = selectAnnouncementState(mockParameters);
//     expect(selected).toMatchObject(mockParameters.allAnnouncements);
//   });
// });
// describe('async actions', () => {
//   afterEach(() => {
//     fetchMock.restore();
//   });
//   it('creates FETCH_ANNOUNCEMENT_SUCCESS when fetching announcements has been done', () => {
//     fetchMock.getOnce(baseUrl + '/posts.json', {
//       data: {
//         allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
//         error: '',
//         loading: false,
//         searchTerm: ''
//       }
//     });
//
//     const expectedActions = [
//       { type: types.FETCH_ANNOUNCEMENT_REQUEST },
//       {
//         type: types.FETCH_ANNOUNCEMENT_SUCCESS,
//         payload: {
//           allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }]
//         }
//       }
//     ];
//     const store = mockStore({ allAnnouncements: [] });
//     store.dispatch(actions.fetchAnnouncement());
//     console.log(store.getActions());
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });
