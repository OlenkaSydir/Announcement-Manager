import React from "react";
import axios from 'axios'
import {
    Announcement,
    EditAnnouncement,
    FindSimilarAnnouncement,
    RemoveAnnouncement,
    SearchAnnouncement
} from "../../shared/types";
import AnnouncementItem from "./announcement-item";

interface IAnnouncementList {
    Announcements: Array<Announcement>;
    removeAnnouncement: RemoveAnnouncement;
    editAnnouncement: EditAnnouncement;
    searchAnnouncement: SearchAnnouncement;
    findSimilarAnnouncement: FindSimilarAnnouncement;
}


export const AnnouncementList = (props: IAnnouncementList):JSX.Element => {
    const {Announcements, removeAnnouncement, editAnnouncement, searchAnnouncement, findSimilarAnnouncement} = props;

    return (
        <ul>

            {/*{Announcements.map(announcement => (*/}
            {/*    <AnnouncementItem*/}
            {/*        announcement={announcement}*/}
            {/*        removeAnnouncement={removeAnnouncement}*/}
            {/*        editAnnouncement={editAnnouncement}*/}
            {/*        searchAnnouncement={searchAnnouncement}*/}
            {/*        findSimilarAnnouncement={findSimilarAnnouncement}*/}
            {/*    />*/}
            {/*))}*/}

            {Announcements&&Object.keys(Announcements).map((keyName) => (
                <AnnouncementItem
                    announcement={Announcements[keyName]}
                    removeAnnouncement={removeAnnouncement}
                    editAnnouncement={editAnnouncement}
                    findSimilarAnnouncement={findSimilarAnnouncement}
                    searchAnnouncement={searchAnnouncement}
                  />
            ))}
        </ul>
    );
};
