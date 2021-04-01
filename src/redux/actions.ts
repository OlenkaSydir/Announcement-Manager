import axios from 'axios';
import { baseUrl } from '../shared/constants';
import {
  FETCH_ANNOUNCEMENT_FAILURE,
  FETCH_ANNOUNCEMENT_REQUEST,
  FETCH_ANNOUNCEMENT_SUCCESS,
  ADD_ANNOUNCEMENT_FAILURE,
  ADD_ANNOUNCEMENT_REQUEST,
  DELETE_ANNOUNCEMENT_REQUEST,
  DELETE_ANNOUNCEMENT_FAILURE,
  EDIT_ANNOUNCEMENT_FAILURE,
  SEARCH_ANNOUNCEMENT_REQUEST
} from './types';
import { Announcement } from '../shared/types';

export const fetchAnnouncementRequest = () => {
  return {
    type: FETCH_ANNOUNCEMENT_REQUEST
  };
};

export const fetchAnnouncementSuccess = announcements => {
  return {
    type: FETCH_ANNOUNCEMENT_SUCCESS,
    payload: announcements
  };
};

export const fetchAnnouncementFailure = error => {
  return {
    type: FETCH_ANNOUNCEMENT_FAILURE,
    payload: error
  };
};

export const fetchAnnouncement = () => {
  return (dispatch) => {
    dispatch(fetchAnnouncementRequest);
    axios.get(baseUrl + '/posts.json')
      .then(response => {
        const announcements = response.data;
        const annArray: Array<Announcement> = [];
        for (const key in announcements) {
          announcements[key].id = key;
          annArray.push(announcements[key]);
        }
        dispatch(fetchAnnouncementSuccess(annArray));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAnnouncementFailure(errorMsg));
      });
  };
};
export const addAnnouncementRequest = () => {
  return {
    type: ADD_ANNOUNCEMENT_REQUEST
  };
};

export const addAnnouncementFailure = error => {
  return {
    type: ADD_ANNOUNCEMENT_FAILURE,
    payload: error
  };
};

export const addAnnouncement = announcement => {
  return (dispatch) => {
    dispatch(addAnnouncementRequest);
    axios.post(baseUrl + '/posts.json', announcement)
      .then(() => {
        dispatch(fetchAnnouncement());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(addAnnouncementFailure(errorMsg));
      });
  };
};

export const deleteAnnouncementRequest = id => {
  return {
    type: DELETE_ANNOUNCEMENT_REQUEST,
    payload: id
  };
};
export const deleteAnnouncementFailure = error => {
  return {
    type: DELETE_ANNOUNCEMENT_FAILURE,
    payload: error
  };
};

export const deleteAnnouncement = id => {
  return (dispatch) => {
    dispatch(deleteAnnouncementRequest);
    axios.delete(baseUrl + `posts/${id}.json`)
      .then((response) => {
        console.log(response);
        dispatch(fetchAnnouncement());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(deleteAnnouncementFailure(errorMsg));
      });
  };
};

export const editAnnouncementFailure = error => {
  return {
    type: EDIT_ANNOUNCEMENT_FAILURE,
    payload: error
  };
};

export const editAnnouncement = (updatedItem) => {
  return (dispatch) => {
    axios.put(baseUrl + `posts/${updatedItem.id}.json`, updatedItem)
      .then((response) => {
        console.log(response);
        dispatch(fetchAnnouncement());
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(editAnnouncementFailure(errorMsg));
      });
  };
};
export const searchAnnouncement = title => {
  return {
    type: SEARCH_ANNOUNCEMENT_REQUEST,
    payload: title
  };
};
