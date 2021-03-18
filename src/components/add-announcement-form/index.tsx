import React, {FormEvent, useState} from "react";
import {AddAnnouncement, Announcement} from "../../shared/constants/types";
import {
    FormWrapper,
    AddWrapper,
    InputWrapper,
    ButtonWrapper,
    HeadingWrapper,
    ImgWrapper
} from './styled';
import uuid from 'react-uuid';

interface AddAnnouncementFormProps {
    addAnnouncement?: AddAnnouncement;
    editAnnouncement?: Announcement;
    onEditSubmit?: (editAnnouncement: Announcement) => void;
    onEditDiscard?: () => void;
}

const initialAnnouncement = {
    id: uuid(),
    title: '',
    description: '',
    dateOfUpdate: new Date().toDateString(),
};
export const AddAnnouncementForm = (props: AddAnnouncementFormProps): JSX.Element => {
    const {
        addAnnouncement,
        editAnnouncement,
        onEditSubmit,
        onEditDiscard
    } = props;

    const [add, setAdd] = useState<boolean>(false);
    const [newAnnouncement, setNewAnnouncement] = useState<Announcement>(
        editAnnouncement
        ? editAnnouncement
        : initialAnnouncement
    );

    const handleChange = (e: any) => {
        let title = {...newAnnouncement, ...{title: e.target.value}};
        setNewAnnouncement(title);
    };

    const handleDescription = (e: any) => {
        let description = {...newAnnouncement, ...{description: e.target.value}};
        setNewAnnouncement(description);
    };

    const handleCancel = () => {
        setAdd(false);
        setNewAnnouncement(initialAnnouncement);
    };

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (editAnnouncement && onEditSubmit) {
            onEditSubmit(newAnnouncement);
        } else {
            if (addAnnouncement) {
                addAnnouncement(newAnnouncement);
            }
        }
        setNewAnnouncement(initialAnnouncement);
    };

    return (
        <>  {!editAnnouncement &&
        <HeadingWrapper >
            My Announcements
            <ImgWrapper
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ0OHB0IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjQ0OHB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00MDggMTg0aC0xMzZjLTQuNDE3OTY5IDAtOC0zLjU4MjAzMS04LTh2LTEzNmMwLTIyLjA4OTg0NC0xNy45MTAxNTYtNDAtNDAtNDBzLTQwIDE3LjkxMDE1Ni00MCA0MHYxMzZjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOGgtMTM2Yy0yMi4wODk4NDQgMC00MCAxNy45MTAxNTYtNDAgNDBzMTcuOTEwMTU2IDQwIDQwIDQwaDEzNmM0LjQxNzk2OSAwIDggMy41ODIwMzEgOCA4djEzNmMwIDIyLjA4OTg0NCAxNy45MTAxNTYgNDAgNDAgNDBzNDAtMTcuOTEwMTU2IDQwLTQwdi0xMzZjMC00LjQxNzk2OSAzLjU4MjAzMS04IDgtOGgxMzZjMjIuMDg5ODQ0IDAgNDAtMTcuOTEwMTU2IDQwLTQwcy0xNy45MTAxNTYtNDAtNDAtNDB6bTAgMCIvPjwvc3ZnPg=="
                alt={''}
                onClick={() => {
                    setAdd(!add)
                }}
                title="Add announcement"
            />
        </HeadingWrapper>}
            {(add || editAnnouncement) &&
                <FormWrapper>
                    <form>
                        <AddWrapper>Title:</AddWrapper>
                        <InputWrapper
                            type="text"
                            value={newAnnouncement.title}
                            onChange={handleChange}
                        />
                        <AddWrapper>Description:</AddWrapper>
                        <InputWrapper
                            type='textarea'
                            value={newAnnouncement.description}
                            onChange={handleDescription}
                        />
                        <br/>
                        <ButtonWrapper
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!newAnnouncement.title}
                        >
                            {addAnnouncement ? 'Add' : 'Edit'}
                        </ButtonWrapper>
                        {addAnnouncement &&
                            <ButtonWrapper
                                onClick={() => {
                                    handleCancel()
                                }}
                            >
                                Cancel
                            </ButtonWrapper>
                        }
                        {editAnnouncement &&
                            <ButtonWrapper
                                type="submit"
                                onClick={onEditDiscard}
                            >
                                Discard
                            </ButtonWrapper>
                        }
                    </form>
                </FormWrapper>
            }
        </>
    );
};