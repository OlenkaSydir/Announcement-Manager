import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AnnouncementList } from '../announcement-list';
import { AddAnnouncementForm } from '../add-announcement-form';
import { baseUrl } from '../../shared/constants/urls';
import Spinner from '../../shared/components/spinner';
import {
  AddAnnouncement,
  Announcement,
  EditAnnouncement,
  RemoveAnnouncement,
  SearchAnnouncement
} from '../../shared/constants/types';
import '../../shared/constants/fonts.css';
import {
  GlobalStyle,
  ListBoxWrapper,
  ItemListWrapper,
  SearchWrapper,
  ImgWrapper
} from './styled';

const MainPage = (): JSX.Element => {
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [items, setItems] = useState<Array<Announcement>>([]);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Search = (e: any) => {
    setSearch(e.target.value);
  };

  const addAnnouncement: AddAnnouncement = newAnnouncement => {
    setIsLoading(true);
    const newPost = {
      id: newAnnouncement.id,
      title: newAnnouncement.title,
      description: newAnnouncement.description,
      dateOfUpdate: newAnnouncement.dateOfUpdate
    };
    axios.post(baseUrl + '/posts.json', newPost)
      .then(() => setIsLoading(false))
      .catch(e => console.log(e));
  };

  const removeAnnouncement: RemoveAnnouncement = item => {
    setIsLoading(true);
    const keys = Object.keys(announcements);
    let number = -1;
    for (let i = 0; i < keys.length; i++) {
      if (Object.is(announcements[keys[i]], item)) {
        number = i;
        break;
      }
    }
    console.log(keys[number]);
    axios.delete(baseUrl + `posts/${keys[number]}.json`)
      .then(response => console.log(response))
      .then(() => setIsLoading(false))
      .catch(e => console.log(e));
  };

  const editAnnouncement: EditAnnouncement = (selectedItem, newValue) => {
    const keys2 = Object.keys(announcements);
    let number2 = -1;
    for (let j = 0; j < keys2.length; j++) {
      if (Object.is(announcements[keys2[j]], selectedItem)) {
        number2 = j;
        break;
      }
    }

    setIsLoading(true);

    axios.put(baseUrl + `posts/${keys2[number2]}.json`, newValue)
      .then(response => console.log(response))
      .then(() => setIsLoading(false))
      .catch(e => console.log(e));
  };

  const searchAnnouncement: SearchAnnouncement = title => {
    const asArr = Object.values(announcements);
    if (title) {
      const searchArr = [...asArr]
        .filter(
          item => item.title
            .toLowerCase()
            .includes(title.toLowerCase())
        );
      setAnnouncements(searchArr);
    } else if (title === '') {
      setAnnouncements(asArr);
    }
  };

  const findSimilarAnnouncement = (announcement: Announcement) => {
    console.log('non available yet');
  };

  const showAll = () => {
    setSearch('');
    setAnnouncements(items);
  };

  useEffect(() => {
    searchAnnouncement(search);
  }, [search]);

  useEffect(() => {
    axios.get(baseUrl + 'posts.json', {})
      .then(response => {
        setAnnouncements(response.data);
        setItems(response.data);
      });
  }, [isLoading]);

  return (
        <>
            <GlobalStyle/>
                <ListBoxWrapper>
                    <AddAnnouncementForm addAnnouncement={addAnnouncement}/>
                    <ItemListWrapper>
                        Announcement List
                        <ImgWrapper
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNDIuNzE2LDI5My4xNDdsLTk0LTEwNy42MDJsOTQtMTA3LjYwMmM3LjU5Ni04LjcwNSw2LjcxLTIxLjkyNC0xLjk5NS0yOS41MjdjLTguNzA1LTcuNTk2LTIxLjkxNy02LjcwMy0yOS41MjcsMS45OTUNCgkJCUw1LjE2OSwxNzEuNzgyYy02Ljg5Miw3Ljg4Mi02Ljg5MiwxOS42NSwwLDI3LjUzMmwxMDYuMDI2LDEyMS4zNzJjNC4xNDMsNC43MjksOS45NCw3LjE1NywxNS43NzEsNy4xNTcNCgkJCWM0Ljg4MywwLDkuNzg2LTEuNzAyLDEzLjc1NS01LjE2OUMxNDkuNDI3LDMxNS4wNzEsMTUwLjMxOSwzMDEuODUyLDE0Mi43MTYsMjkzLjE0N3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM1OS45MywxNjQuNjE5SDIwLjkyNkM5LjM2OCwxNjQuNjE5LDAsMTczLjk4NiwwLDE4NS41NDVjMCwxMS41NTgsOS4zNjgsMjAuOTI2LDIwLjkyNiwyMC45MjZIMzU5LjkzDQoJCQljNjAuNzc2LDAsMTEwLjIxOCw0OS40NDEsMTEwLjIxOCwxMTAuMjExUzQyMC43MDYsNDI2Ljg5MywzNTkuOTMsNDI2Ljg5M0g0OC44MjhjLTExLjU1OCwwLTIwLjkyNiw5LjM2OC0yMC45MjYsMjAuOTI2DQoJCQljMCwxMS41NTgsOS4zNjgsMjAuOTI2LDIwLjkyNiwyMC45MjZIMzU5LjkzYzgzLjg0NCwwLDE1Mi4wNy02OC4yMTksMTUyLjA3LTE1Mi4wNjNTNDQzLjc4MSwxNjQuNjE5LDM1OS45MywxNjQuNjE5eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                            onClick={() => {
                              showAll();
                            }}
                            title="Show All"
                            alt='Show All'/>
                        <SearchWrapper
                            type="text"
                            name='text'
                            value={search}
                            onChange={Search}
                            placeholder='Search'/>
                    </ItemListWrapper>
                    {isLoading &&
                        <Spinner/>
                    }
                    <AnnouncementList
                        Announcements={announcements}
                        removeAnnouncement={removeAnnouncement}
                        editAnnouncement={editAnnouncement}
                        searchAnnouncement={searchAnnouncement}
                        findSimilarAnnouncement={findSimilarAnnouncement}
                    />
                </ListBoxWrapper>
        </>
  );
};

export default MainPage;
