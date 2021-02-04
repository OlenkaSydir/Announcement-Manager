import React, {useState} from "react";
import "../../styles/single-announcement.css";
import {
    Announcement,
    EditAnnouncement,
    FindSimilarAnnouncement,
    RemoveAnnouncement,
    SearchAnnouncement
} from "../../shared/types";
import {RiDeleteBinLine} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'
import {AddAnnouncementForm} from "./add-announcement-form";


interface IAnnouncementItem {
    announcement: Announcement;
    removeAnnouncement: RemoveAnnouncement;
    editAnnouncement: EditAnnouncement;
    findSimilarAnnouncement: FindSimilarAnnouncement;
    searchAnnouncement: SearchAnnouncement;
}


const AnnouncementItem = (props: IAnnouncementItem): JSX.Element => {
    const {announcement, removeAnnouncement, editAnnouncement, findSimilarAnnouncement} = props;

    const [edit, setEdit] = useState<Announcement>()
    const [show, setShow] = useState<boolean>(false)

    const submitUpdate = (value: Announcement) => {
        if (edit !== undefined) {
            editAnnouncement(edit, value);
            setEdit({
                id: edit.id,
                title: edit.title,
                description: edit.description,
                dateOfUpdate: new Date().toDateString(),
            });
        }
    };
    const onEditCancel = () => {
        setEdit(undefined)
    }

    if (edit) {
        return <AddAnnouncementForm editAnnouncement={edit} onEditSubmit={submitUpdate} onEditDiscard={onEditCancel}/>;
    }
    return (

        <li key={announcement.id}>
            <div className='list-item' onClick={() => setShow(!show)}>
                <div className={!show?'item-property':'item-property-show'}>
                    Title: <span className='item-property-value'>{announcement.title}</span>
                </div>
                {show &&
                <div>
                    <div className='item-property-show'>
                        Description: <span className='item-property-value'>{announcement.description}</span>
                    </div>
                    <div className='item-property-show'>
                        Date of last change: <span
                        className='item-property-value'>{announcement.dateOfUpdate}</span>
                    </div>
                </div>
                }
                <div className={!show?'announcement-buttons':'announcement-buttons-show'} id='announcement-buttons'>
                    <div className='edit-icon'>
                    <AiOutlineEdit onClick={() => {
                        setEdit(announcement)
                    }}
                    /></div>
                    <div className='delete-icon'>
                    <RiDeleteBinLine onClick={() => removeAnnouncement(announcement.id)}

                    />
                    </div>
                    <button className="similar-btn"
                            onClick={() => {
                                findSimilarAnnouncement(announcement)
                            }}
                    >Find similar
                    </button>
                </div>
            </div>
        </li>
    );
};
export default AnnouncementItem;