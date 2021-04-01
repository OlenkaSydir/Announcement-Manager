import React from 'react';
import {
  Announcement,
  EditAnnouncement,
  RemoveAnnouncement
} from '../../shared/constants/types';
import { AnnouncementItem } from '../announcement-item';

interface IAnnouncementList {
    Announcements: Array<Announcement>;
    removeAnnouncement: RemoveAnnouncement;
    editAnnouncement: EditAnnouncement;
}

export const AnnouncementList = (props: IAnnouncementList):JSX.Element => {
  const {
    Announcements,
    removeAnnouncement,
    editAnnouncement
  } = props;
  return (
        <ul>
             {
                Announcements.map((announcement) => (
                    <AnnouncementItem
                        announcement={announcement}
                        remove={removeAnnouncement}
                        editAnnouncement={editAnnouncement}
                    />
                ))
             }
        </ul>
  );
};
