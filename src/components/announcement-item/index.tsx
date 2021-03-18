import React, {useState} from 'react';
import {
    ListItemWrapper,
    ButtonWrapper,
    SimButtonWrapper,
    LIWrapper,
    ItemPropertyValueWrapper,
    AllButtonsWrapper,
    ItemPropWrapper
} from "./styled";
import {
    Announcement,
    EditAnnouncement,
    FindSimilarAnnouncement,
    RemoveAnnouncement,
    SearchAnnouncement
} from "../../shared/constants/types";
import {RiDeleteBinLine} from 'react-icons/ri';
import {AiOutlineEdit} from 'react-icons/ai';
import {AddAnnouncementForm} from "../add-announcement-form";


interface IAnnouncementItem {
    announcement: Announcement;
    removeAnnouncement: RemoveAnnouncement;
    editAnnouncement: EditAnnouncement;
    findSimilarAnnouncement: FindSimilarAnnouncement;
    searchAnnouncement: SearchAnnouncement;
}


const AnnouncementItem = (props: IAnnouncementItem): JSX.Element => {
    const {
        announcement,
        removeAnnouncement,
        editAnnouncement,
        findSimilarAnnouncement
    } = props;

    const [edit, setEdit] = useState<Announcement>();
    const [show, setShow] = useState<boolean>(false);

    const submitUpdate = (value: Announcement) => {
        if (edit !== undefined) {
            editAnnouncement(edit, value);
            setEdit({
                id: edit.id,
                title: edit.title,
                description: edit.description,
                dateOfUpdate: new Date().toDateString(),
            });
            setEdit(undefined);
        }
    };

    const onEditDiscard = () => {
        setEdit(undefined);
    };

    if (edit) {
        return <AddAnnouncementForm
            editAnnouncement={edit}
            onEditSubmit={submitUpdate}
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
                    <ItemPropertyValueWrapper>
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
                            <ItemPropertyValueWrapper>
                            {announcement.description}
                            </ItemPropertyValueWrapper>
                        </ItemPropWrapper>
                        <ItemPropWrapper
                            show={show}
                            onClick={() => setShow(!show)}
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
                    <AiOutlineEdit
                        onClick={() => {
                            setEdit(announcement)
                    }}
                    /></ButtonWrapper>
                    <ButtonWrapper >
                    <RiDeleteBinLine
                        onClick={() => removeAnnouncement(announcement)}
                    />
                    </ButtonWrapper>
                    <SimButtonWrapper
                            onClick={() => {
                                findSimilarAnnouncement(announcement)
                            }}
                    >
                        Find similar
                    </SimButtonWrapper>
                </AllButtonsWrapper>
            </ListItemWrapper>
        </LIWrapper>
    );
};
export default AnnouncementItem;