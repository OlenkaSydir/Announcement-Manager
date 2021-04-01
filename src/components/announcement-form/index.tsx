import React, { FormEvent, useState } from 'react';
import { AddAnnouncement, Announcement, EditAnnouncement } from '../../shared/constants/types';
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
    item?: Announcement;
    addAnnouncements?: AddAnnouncement;
    edit?: EditAnnouncement
    onEditDiscard?: () => void;
}

const initialAnnouncement = {
  id: uuid(),
  title: '',
  description: '',
  dateOfUpdate: new Date().toDateString()
};
export const AddAnnouncementForm = (props: AddAnnouncementFormProps): JSX.Element => {
  const {
    item,
    addAnnouncements,
    edit,
    onEditDiscard
  } = props;
  const isEdit = !!item;

  const [open, setOpen] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<Announcement>(item ? item : initialAnnouncement);

  const handleTitleChange = (e: any) => {
    const title = { ...announcement, ...{ title: e.target.value } };
    setAnnouncement(title);
  };

  const handleDescriptionChange = (e: any) => {
    const description = { ...announcement, ...{ description: e.target.value } };
    setAnnouncement(description);
  };

  const handleCancel = () => {
    if (isEdit) {
      onEditDiscard && onEditDiscard();
    } else {
      setAnnouncement(initialAnnouncement);
      setOpen(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEdit) {
      edit && edit(announcement);
      onEditDiscard && onEditDiscard();
    } else {
      addAnnouncements && addAnnouncements(announcement);
      setAnnouncement(initialAnnouncement);
    }
  };

  return (
        <>
          { !isEdit &&
            <HeadingWrapper >
              My Announcements
              <ImgWrapper
                  src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ0OHB0IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjQ0OHB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00MDggMTg0aC0xMzZjLTQuNDE3OTY5IDAtOC0zLjU4MjAzMS04LTh2LTEzNmMwLTIyLjA4OTg0NC0xNy45MTAxNTYtNDAtNDAtNDBzLTQwIDE3LjkxMDE1Ni00MCA0MHYxMzZjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOGgtMTM2Yy0yMi4wODk4NDQgMC00MCAxNy45MTAxNTYtNDAgNDBzMTcuOTEwMTU2IDQwIDQwIDQwaDEzNmM0LjQxNzk2OSAwIDggMy41ODIwMzEgOCA4djEzNmMwIDIyLjA4OTg0NCAxNy45MTAxNTYgNDAgNDAgNDBzNDAtMTcuOTEwMTU2IDQwLTQwdi0xMzZjMC00LjQxNzk2OSAzLjU4MjAzMS04IDgtOGgxMzZjMjIuMDg5ODQ0IDAgNDAtMTcuOTEwMTU2IDQwLTQwcy0xNy45MTAxNTYtNDAtNDAtNDB6bTAgMCIvPjwvc3ZnPg=="
                  alt={''}
                  onClick={() => setOpen(true)}
                  title="Add announcement"
              />
            </HeadingWrapper>
            }
            {(open || isEdit) &&
                <FormWrapper>
                    <form>
                        <AddWrapper>Title:</AddWrapper>
                        <InputWrapper
                            type="text"
                            value={announcement.title}
                            onChange={handleTitleChange}
                        />
                        <AddWrapper>Description:</AddWrapper>
                        <InputWrapper
                            type='textarea'
                            value={announcement.description}
                            onChange={handleDescriptionChange}
                        />
                        <br/>
                        <ButtonWrapper
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!announcement.title}
                        >
                             {isEdit ? 'Edit' : 'Add'}
                        </ButtonWrapper>
                        <ButtonWrapper
                          onClick={() => {
                            handleCancel();
                          }}
                        >
                          {isEdit ? 'Discard' : 'Cancel'}
                        </ButtonWrapper>
                    </form>
                </FormWrapper>
            }
        </>
  );
};
