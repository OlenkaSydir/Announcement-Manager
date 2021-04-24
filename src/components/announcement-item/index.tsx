import React, { useState } from 'react';
import {
  ListItemWrapper,
  ButtonWrapper,
  LIWrapper,
  ItemPropertyValueWrapper,
  AllButtonsWrapper,
  ItemPropWrapper
} from './styled';
import {
  Announcement,
  EditAnnouncement,
  RemoveAnnouncement
} from '../../shared/types';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { AddAnnouncementForm } from '../announcement-form';

interface IAnnouncementItem {
  announcement: Announcement;
  remove: RemoveAnnouncement;
  editAnnouncement: EditAnnouncement;
}

export const AnnouncementItem = (props: IAnnouncementItem): JSX.Element => {
  const {
    announcement,
    remove,
    editAnnouncement
  } = props;

  const [edit, setEdit] = useState<Announcement>();
  const [show, setShow] = useState<boolean>(false);

  const onEditDiscard = () => {
    setEdit(undefined);
  };

  if (edit) {
    return <AddAnnouncementForm
              item={announcement}
              edit={editAnnouncement}
              onEditDiscard={onEditDiscard}
           />;
  }
  return (
    <LIWrapper key={announcement.id}>
      <ListItemWrapper>
        <ItemPropWrapper
          show={show}
          onClick={() => setShow(!show)}
        >
        Title:
        <ItemPropertyValueWrapper role='showTitle'>
        {announcement.title}
        </ItemPropertyValueWrapper>
        </ItemPropWrapper>
        {show &&
          <div>
            <ItemPropWrapper
              show={show}
              onClick={() => setShow(!show)}
            >
              Description:
              <ItemPropertyValueWrapper role='description'>
                {announcement.description}
              </ItemPropertyValueWrapper>
            </ItemPropWrapper>
            <ItemPropWrapper
                show={show}
                onClick={() => setShow(!show)}
                role='date'
            >
              Date of last change:
              <ItemPropertyValueWrapper>
                {announcement.dateOfUpdate}
              </ItemPropertyValueWrapper>
            </ItemPropWrapper>
          </div>
        }
        <AllButtonsWrapper >
          <ButtonWrapper >
            <AiOutlineEdit role='editButton'
              onClick={() => {
                setEdit(announcement);
              }}
          /></ButtonWrapper>
          <ButtonWrapper >
            <RiDeleteBinLine role='deleteButton'
              onClick={() => remove(announcement.id)}
            />
          </ButtonWrapper>
        </AllButtonsWrapper>
      </ListItemWrapper>
    </LIWrapper>
  );
};
