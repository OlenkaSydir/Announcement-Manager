import {
  FETCH_ANNOUNCEMENT_FAILURE,
  FETCH_ANNOUNCEMENT_REQUEST,
  FETCH_ANNOUNCEMENT_SUCCESS,
  ADD_ANNOUNCEMENT_FAILURE,
  ADD_ANNOUNCEMENT_REQUEST,
  DELETE_ANNOUNCEMENT_REQUEST,
  EDIT_ANNOUNCEMENT_REQUEST,
  SEARCH_ANNOUNCEMENT_REQUEST, DELETE_ANNOUNCEMENT_FAILURE, EDIT_ANNOUNCEMENT_FAILURE
} from './types';
const initialState = {
  loading: false,
  allAnnouncements: [],
  error: '',
  searchTerm: ''
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANNOUNCEMENT_REQUEST:
    case ADD_ANNOUNCEMENT_REQUEST:
    case EDIT_ANNOUNCEMENT_REQUEST:
    case DELETE_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        allAnnouncements: action.payload
      };
    case SEARCH_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        searchTerm: action.payload
      };
    case FETCH_ANNOUNCEMENT_FAILURE:
    case ADD_ANNOUNCEMENT_FAILURE:
    case DELETE_ANNOUNCEMENT_FAILURE:
    case EDIT_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
export default announcementReducer;
