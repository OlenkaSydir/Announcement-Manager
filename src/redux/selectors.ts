import { createSelector } from 'reselect';

export const selectAnnouncementState = store => store.allAnnouncements;

export const selectSearchTerm = createSelector(
  [selectAnnouncementState],
  (allAnns) => allAnns.searchTerm
);

export const selectAllAnnouncements = createSelector(
  [selectAnnouncementState],
  (allAnns) => allAnns.allAnnouncements
);

export const selectFilteredAnns = createSelector(
  [selectAllAnnouncements, selectSearchTerm],
  (allAnns, searchTerm) => {
    return allAnns.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
);

export const selectLoading = createSelector(
  [selectAnnouncementState],
  (allAnns) => allAnns.loading
);
export const selectError = createSelector(
  [selectAnnouncementState],
  (allAnns) => allAnns.error
);
