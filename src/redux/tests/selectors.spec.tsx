import {
  selectAllAnnouncements,
  selectAnnouncementState,
  selectError,
  selectFilteredAnns,
  selectLoading, selectSearchTerm
} from '../selectors';

describe('selectors', () => {
  it('should select search term', () => {
    const mockParameters = {
      allAnnouncements: [{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }],
      error: '',
      loading: false,
      searchTerm: 'test1'
    };
    const selected = selectSearchTerm.resultFunc(mockParameters);
    expect(selected).toBe('test1');
  });
  it('should select all announcements', () => {
    const mockParameters = {
      allAnnouncements: [{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }],
      error: '',
      loading: false,
      searchTerm: ''
    };
    const selected = selectAllAnnouncements.resultFunc(mockParameters);
    expect(selected).toMatchObject([{ id: 1, title: 'tes1', description: '', dateOfUpdate: new Date().toDateString() }]);
  });
  it('should select filtered announcements', () => {
    const mockParameters = {
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
      error: '',
      loading: false,
      searchTerm: 'test1'
    };
    const selected = selectFilteredAnns.resultFunc(mockParameters.allAnnouncements, mockParameters.searchTerm);
    expect(selected).toMatchObject([{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }]);
  });
  it('should select loading state', () => {
    const mockParameters = {
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
      error: '',
      loading: false,
      searchTerm: 'test1'
    };
    const selected = selectLoading.resultFunc(mockParameters);
    expect(selected).toBe(false);
  });
  it('should select error', () => {
    const mockParameters = {
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
      error: 'qwerty',
      loading: false,
      searchTerm: 'test1'
    };
    const selected = selectError.resultFunc(mockParameters);
    expect(selected).toBe('qwerty');
  });
  it('should select init state', () => {
    const mockParameters = {
      allAnnouncements: [{ id: 1, title: 'test1', description: '', dateOfUpdate: new Date().toDateString() }],
      error: 'qwerty',
      loading: false,
      searchTerm: 'test1'
    };
    const selected = selectAnnouncementState(mockParameters);
    expect(selected).toMatchObject(mockParameters.allAnnouncements);
  });
});
