import axios from 'axios';
import { baseUrl } from '../../shared/constants';
import * as types from '../types';
import * as actions from '../actions';

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

const responseMocked = {
  data: {
    id1: {
      title: 'Test 1',
      description: 'test 1',
      dateOfUpdate: 'test1'
    },
    id2: {
      title: 'Test 2',
      description: 'test 2',
      dateOfUpdate: 'test2'
    }
  }
};
const addResponseMocked = {
  data: {
    name: 'id3'
  }
};
const announcementsMocked = [
  {
    id: 'id1',
    title: 'Test 1',
    description: 'test 1',
    dateOfUpdate: 'test1'
  },
  {
    id: 'id2',
    title: 'Test 2',
    description: 'test 2',
    dateOfUpdate: 'test2'
  }
];

describe('actions', () => {
  describe('fetch', () => {
    it('should call fetchAnnouncementSuccess on successful get request', async () => {
      const dispatchMock = jest.fn();

      mockedAxios.get.mockResolvedValue(responseMocked);

      await actions.fetchAnnouncement()(dispatchMock);
      expect(dispatchMock).toHaveBeenCalledWith(actions.fetchAnnouncementRequest());
      expect(dispatchMock).toHaveBeenCalledWith(actions.fetchAnnouncementSuccess(announcementsMocked));
    });
    it('should call fetchAnnouncementFailure on failed get request', async () => {
      const dispatchMock = jest.fn();
      const errorMocked = new Error('error');
      // axios.get = jest.fn().mockRejectedValue(errorMocked.message);
      mockedAxios.get.mockRejectedValue(errorMocked.message);

      await actions.fetchAnnouncement()(dispatchMock);
      expect(dispatchMock).toHaveBeenCalledWith(actions.fetchAnnouncementRequest());
      expect(dispatchMock).toHaveBeenCalledWith(actions.fetchAnnouncementFailure(errorMocked));
      // expect(dispatchMock).toThrowError(errorMocked); вертає => Received function did not throw
    });
    it('should call successful fetch action', () => {
      const announcements = jest.fn();
      const expectedAction = {
        type: types.FETCH_ANNOUNCEMENT_SUCCESS,
        payload: announcements
      };
      expect(actions.fetchAnnouncementSuccess(announcements)).toEqual(expectedAction);
    });
    it('should call request fetch action', () => {
      const expectedAction = {
        type: types.FETCH_ANNOUNCEMENT_REQUEST
      };
      expect(actions.fetchAnnouncementRequest()).toEqual(expectedAction);
    });
    it('should call failed fetch action', () => {
      const error = 'qwerty';
      const expectAction = {
        type: types.FETCH_ANNOUNCEMENT_FAILURE,
        payload: 'qwerty'
      };
      expect(actions.fetchAnnouncementFailure(error)).toEqual(expectAction);
    });
  });

  describe('add actions', () => {
    // it('should call addAnnouncementSuccess on successful post request', () => {
    //   const dispatchMock = jest.fn();
    //
    //   mockedAxios.post.mockResolvedValue(addResponseMocked);
    //   mockedAxios.get.mockResolvedValue(responseMocked);
    //
    //   actions.addAnnouncement({
    //     title: 'Test 3',               ---> вертає Number of calls: 1 тільки ADD_ANNOUNCEMENT_REQUEST
    //     description: 'test 3'
    //   })(dispatchMock);
    //   expect(dispatchMock).toHaveBeenCalledWith(actions.fetchAnnouncementRequest());
    //   expect(dispatchMock).toHaveBeenCalledWith(actions.fetchAnnouncementSuccess(announcementsMocked));
    // });
    it('should call add request action', () => {
      const expectedAction = {
        type: types.ADD_ANNOUNCEMENT_REQUEST
      };
      expect(actions.addAnnouncementRequest()).toEqual(expectedAction);
    });
    it('should call add failure action', () => {
      const error = 'qwerty';
      const expectedAction = {
        type: types.ADD_ANNOUNCEMENT_FAILURE,
        payload: error
      };
      expect(actions.addAnnouncementFailure(error)).toEqual(expectedAction);
    });
  });

  describe('delete actions', () => {
    it('should call delete request action', () => {
      const expectedAction = {
        type: types.DELETE_ANNOUNCEMENT_REQUEST
      };
      expect(actions.deleteAnnouncementRequest()).toEqual(expectedAction);
    });
    it('should call delete failure action', () => {
      const error = 'qwerty';
      const expectedAction = {
        type: types.DELETE_ANNOUNCEMENT_FAILURE,
        payload: error
      };
      expect(actions.deleteAnnouncementFailure(error)).toEqual(expectedAction);
    });
  });

  describe('edit actions', () => {
    it('should call edit failure action', () => {
      const error = 'qwerty';
      const expectedAction = {
        type: types.EDIT_ANNOUNCEMENT_FAILURE,
        payload: error
      };
      expect(actions.editAnnouncementFailure(error)).toEqual(expectedAction);
    });
  });

  describe('search actions', () => {
    it('should call search action', () => {
      const title = 'qwerty';
      const expectedAction = {
        type: types.SEARCH_ANNOUNCEMENT_REQUEST,
        payload: title
      };
      expect(actions.searchAnnouncement(title)).toEqual(expectedAction);
    });
  });
});
