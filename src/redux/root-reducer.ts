import { combineReducers } from 'redux';
import announcementReducer from './reducer';

const rootReducer = combineReducers({
  allAnnouncements: announcementReducer
});

export default rootReducer;
