import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectError, selectFilteredAnns, selectLoading } from '../../redux/selectors';
import {
  fetchAnnouncement,
  addAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  searchAnnouncement
} from '../../redux/actions';
import { AddAnnouncementForm } from '../announcement-form';
import { AnnouncementList } from '../announcement-list';
import Spinner from '../../shared/components/spinner';
import {
  AddAnnouncement,
  Announcement,
  EditAnnouncement,
  FetchAnnouncement,
  RemoveAnnouncement,
  SearchAnnouncement
} from '../../shared/types';
import '../../shared/fonts.css';
import {
  GlobalStyle,
  ListBoxWrapper,
  ItemListWrapper,
  SearchWrapper,
  ImgWrapper
} from './styled';

interface IMainPage {
  loading: boolean;
  error: string;
  fetchAnnouncement: FetchAnnouncement;
  addAnnouncements: AddAnnouncement;
  deleteAnnouncement: RemoveAnnouncement;
  searchAnnouncement: SearchAnnouncement;
  searchTerm: string;
  filteredAnnouncements: Array<Announcement>;
  editAnnouncement: EditAnnouncement;
}

const MainPage = (props: IMainPage): JSX.Element => {
  const [search, setSearch] = useState<string>('');

  const {
    fetchAnnouncement,
    loading,
    addAnnouncements,
    deleteAnnouncement,
    searchAnnouncement,
    filteredAnnouncements,
    editAnnouncement
  } = props;

  useEffect(() => {
    fetchAnnouncement();
  }, []);
  useEffect(() => {
    searchAnnouncement(search);
  }, [search]);
  return (
    <>
      <GlobalStyle/>
        <ListBoxWrapper>
          <AddAnnouncementForm addAnnouncements={addAnnouncements}/>
          <ItemListWrapper>
            Announcement List
            <ImgWrapper
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNDIuNzE2LDI5My4xNDdsLTk0LTEwNy42MDJsOTQtMTA3LjYwMmM3LjU5Ni04LjcwNSw2LjcxLTIxLjkyNC0xLjk5NS0yOS41MjdjLTguNzA1LTcuNTk2LTIxLjkxNy02LjcwMy0yOS41MjcsMS45OTUNCgkJCUw1LjE2OSwxNzEuNzgyYy02Ljg5Miw3Ljg4Mi02Ljg5MiwxOS42NSwwLDI3LjUzMmwxMDYuMDI2LDEyMS4zNzJjNC4xNDMsNC43MjksOS45NCw3LjE1NywxNS43NzEsNy4xNTcNCgkJCWM0Ljg4MywwLDkuNzg2LTEuNzAyLDEzLjc1NS01LjE2OUMxNDkuNDI3LDMxNS4wNzEsMTUwLjMxOSwzMDEuODUyLDE0Mi43MTYsMjkzLjE0N3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM1OS45MywxNjQuNjE5SDIwLjkyNkM5LjM2OCwxNjQuNjE5LDAsMTczLjk4NiwwLDE4NS41NDVjMCwxMS41NTgsOS4zNjgsMjAuOTI2LDIwLjkyNiwyMC45MjZIMzU5LjkzDQoJCQljNjAuNzc2LDAsMTEwLjIxOCw0OS40NDEsMTEwLjIxOCwxMTAuMjExUzQyMC43MDYsNDI2Ljg5MywzNTkuOTMsNDI2Ljg5M0g0OC44MjhjLTExLjU1OCwwLTIwLjkyNiw5LjM2OC0yMC45MjYsMjAuOTI2DQoJCQljMCwxMS41NTgsOS4zNjgsMjAuOTI2LDIwLjkyNiwyMC45MjZIMzU5LjkzYzgzLjg0NCwwLDE1Mi4wNy02OC4yMTksMTUyLjA3LTE1Mi4wNjNTNDQzLjc4MSwxNjQuNjE5LDM1OS45MywxNjQuNjE5eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
              onClick={() => {
                setSearch('');
              }}
              title="Show All"
              alt='Show All'
            />
            <SearchWrapper
              type="text"
              name='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
            />
          </ItemListWrapper>
          {
            loading &&
             <Spinner/>
          }
          {
            <AnnouncementList
              Announcements={ filteredAnnouncements }
              removeAnnouncement={deleteAnnouncement}
              editAnnouncement={editAnnouncement}
            />
          }
        </ListBoxWrapper>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: selectLoading(state),
    error: selectError(state),
    filteredAnnouncements: selectFilteredAnns(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAnnouncement: () => dispatch(fetchAnnouncement()),
    addAnnouncements: (newPost) => dispatch(addAnnouncement(newPost)),
    deleteAnnouncement: (id) => dispatch(deleteAnnouncement(id)),
    editAnnouncement: (item) => dispatch(editAnnouncement(item)),
    searchAnnouncement: (searchTerm) => dispatch(searchAnnouncement(searchTerm))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
