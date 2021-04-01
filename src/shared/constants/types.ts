import uuid from 'react-uuid';
export type Announcement = {
  id: uuid;
  title: string;
  description: string;
  dateOfUpdate: string;
};

export type AddAnnouncement = (newAnnouncement: Announcement) => void;
export type RemoveAnnouncement = (id: string) => void;
export type SearchAnnouncement = (title: string) => void;
export type EditAnnouncement = (newAnnouncement: Announcement) => void;
export type FetchAnnouncement = () => {announcements: []};
