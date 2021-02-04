import uuid from 'react-uuid'
export type Announcement = {
  id: uuid;
  title: string;
  description: string;
  dateOfUpdate: string;
};

export type AddAnnouncement = (newAnnouncement: Announcement) => void;
export type RemoveAnnouncement = (id: number) => void;
export type SearchAnnouncement = (title: string) => void;
export type EditAnnouncement = (announcement: Announcement, newAnnouncement: Announcement) => void;
export type FindSimilarAnnouncement = (announcement: Announcement) => void;
