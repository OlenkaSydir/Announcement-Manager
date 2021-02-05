import React, {FormEvent, useState} from "react";
import {AddAnnouncement, Announcement} from "../../shared/types";
import '../../styles/add-announcement-form.css'
import uuid from 'react-uuid'

interface AddAnnouncementFormProps {
    addAnnouncement?: AddAnnouncement;
    editAnnouncement?: Announcement;
    onEditSubmit?: (editAnnouncement: Announcement) => void;
    onEditDiscard?: () => void;
}


export const AddAnnouncementForm = (props: AddAnnouncementFormProps): JSX.Element => {
    const {addAnnouncement, editAnnouncement, onEditSubmit, onEditDiscard} = props;

    const [add, setAdd] = useState<boolean>(false);
    const [newAnnouncement, setNewAnnouncement] = useState<Announcement>(editAnnouncement ? editAnnouncement : {
        id: uuid(),
        title: '',
        description: '',
        dateOfUpdate: new Date().toDateString(),
    });

    const handleChange = (e: any) => {
        let title = {...newAnnouncement, ...{title: e.target.value}}
        setNewAnnouncement(title)
    }
    const handleDescription = (e: any) => {
        let description = {...newAnnouncement, ...{description: e.target.value}}
        setNewAnnouncement(description)
    }
    const handleCancel = () => {
        setAdd(false);
        setNewAnnouncement({
            id: uuid(),
            title: '',
            description: '',
            dateOfUpdate: new Date().toDateString(),
        })

    }


    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (editAnnouncement && onEditSubmit) {
            onEditSubmit(newAnnouncement)

        } else {
            if (addAnnouncement) {
                addAnnouncement(newAnnouncement);
            }
        }
        setNewAnnouncement({
            id: uuid(),
            title: '',
            description: '',
            dateOfUpdate: new Date().toDateString(),
        });
        //setAdd(false);
    };

    return (
        <>  {!editAnnouncement &&
        <div className='heading'>
            My Announcements
            <img
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ0OHB0IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjQ0OHB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00MDggMTg0aC0xMzZjLTQuNDE3OTY5IDAtOC0zLjU4MjAzMS04LTh2LTEzNmMwLTIyLjA4OTg0NC0xNy45MTAxNTYtNDAtNDAtNDBzLTQwIDE3LjkxMDE1Ni00MCA0MHYxMzZjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOGgtMTM2Yy0yMi4wODk4NDQgMC00MCAxNy45MTAxNTYtNDAgNDBzMTcuOTEwMTU2IDQwIDQwIDQwaDEzNmM0LjQxNzk2OSAwIDggMy41ODIwMzEgOCA4djEzNmMwIDIyLjA4OTg0NCAxNy45MTAxNTYgNDAgNDAgNDBzNDAtMTcuOTEwMTU2IDQwLTQwdi0xMzZjMC00LjQxNzk2OSAzLjU4MjAzMS04IDgtOGgxMzZjMjIuMDg5ODQ0IDAgNDAtMTcuOTEwMTU2IDQwLTQwcy0xNy45MTAxNTYtNDAtNDAtNDB6bTAgMCIvPjwvc3ZnPg=="
                style={{width: '20px', marginLeft: "20px"}}
                onClick={() => {
                    setAdd(true)
                }}
                title="Add announcement"
            />
        </div>}
            {(add || editAnnouncement) &&
            <div className='form'>
                <form>
                    <div className='title'>Title:</div>
                    <input type="text"
                           value={newAnnouncement.title}
                           onChange={handleChange}
                           className='list-input'
                    />
                    <div className='description-input'>Description:</div>
                    <input type='textarea'
                           value={newAnnouncement.description}
                           onChange={handleDescription}
                           className='list-input'
                    />
                    <br/>
                    <button className='form-btn' type="submit" onClick={handleSubmit} disabled={!newAnnouncement.title}>
                        {addAnnouncement ? 'Add' : 'Edit'}
                    </button>
                    {addAnnouncement && <button className='form-btn' onClick={() => {
                        handleCancel()
                    }}>
                        Cancel
                    </button>
                    }
                    {editAnnouncement &&
                    <button className='form-btn' type="submit" onClick={onEditDiscard}>
                        Discard
                    </button>
                    }
                </form>
            </div>}

        </>
    );
};
