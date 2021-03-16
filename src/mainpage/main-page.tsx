import React, {useEffect, useState} from "react";
import axios from 'axios'
import {initialAnnouncements} from "./items/initial-announcements";
import {AnnouncementList} from "./items/announcement-list";
import {AddAnnouncementForm} from "./items/add-announcement-form";
import {AddAnnouncement, Announcement, EditAnnouncement, RemoveAnnouncement, SearchAnnouncement} from "../shared/types";
import '../styles/main-page.css'
import '../styles/fonts.css'
import Spinner from "../spinner/spinner";
import AnnouncementItem from "./items/announcement-item";


const MainPage = (): JSX.Element => {

    const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
    const [items, setItems] = useState<Array<Announcement>>([]);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const baseUrl = 'https://react-announcement-manager-default-rtdb.firebaseio.com/';



    const Search = (e: any) => {
        setSearch(e.target.value);
    };

    const addAnnouncement: AddAnnouncement = newAnnouncement => {
        setIsLoading(true);
        const newPost = {
            id: newAnnouncement.id,
            title: newAnnouncement.title,
            description: newAnnouncement.description,
            dateOfUpdate: newAnnouncement.dateOfUpdate,
        }
        axios.post( baseUrl + '/posts.json', newPost)
            .then(response => setIsLoading(false))
            .catch(e => console.log(e));
        // let allAnnouncements = [...items, newPost];
        // setAnnouncements(allAnnouncements);
        // setItems(allAnnouncements);
    };
    const removeAnnouncement: RemoveAnnouncement = item => {
        setIsLoading(true);
        const keys = Object.keys(announcements)
        let number = -1;
        for (let i = 0; i < keys.length; i++){
            if (Object.is(announcements[keys[i]], item)){
                number = i;
                break;
            }
        }
        console.log(keys[number]);
        axios.delete(baseUrl + `posts/${keys[number]}.json`)
            .then(response => console.log(response))
            .then(()=>setIsLoading(false))

            .catch(e=> console.log(e));

        // setAnnouncements(removeArr);
        // setItems(removeArr);
    };

    const editAnnouncement: EditAnnouncement = (selectedItem, newValue) => {
        const keys2 = Object.keys(announcements)
        console.log(keys2);
        let number2 = -1;
        for (let j = 0; j < keys2.length; j++){
            if (Object.is(announcements[keys2[j]], selectedItem)){
                number2 = j;
                break;
            }
        }
        setIsLoading(true)
        axios.put(baseUrl + `posts/${keys2[number2]}.json`, newValue)
            .then(response => console.log(response))
            .then(()=>setIsLoading(false))
            .catch(e => console.log(e));
        // setAnnouncements(prev => prev.map(item => (item.title === selectedItem.title ? newValue : item)));
        // setItems(prev => prev.map(item => (item.title === selectedItem.title ? newValue : item)));
    };

    const searchAnnouncement: SearchAnnouncement = title => {
        const asArr = Object.values(announcements);
        if (title) {
            const searchArr = [...asArr].filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
            setAnnouncements(searchArr);
        }
        else if (title === '') {
            setAnnouncements(asArr);
        }
    };
    const findSimilarAnnouncement = (announcement: Announcement) => {
        console.log('NON AVAILABLE NOW:)')
        const asArr = Object.values(announcements)
        const filterArr = [...asArr].filter(item => item.id !== announcement.id);
        const title = announcement.title;
        const description = announcement.description;
        const similarTitleArr: Announcement[] = [];
        const similarArr: Announcement[] = [announcement];

        for (let i = 0; i < title.split(' ').length; i++) {
            for (let j = 0; j < filterArr.length; j++) {
                if (filterArr[j].title.includes(title.split(' ')[i])) {
                    similarTitleArr.push(filterArr[j]);
                    filterArr.splice(j);
                }
            }
        }
        for (let i = 0; i < description.split(' ').length; i++) {
            for (let j = 0; j < similarTitleArr.length; j++) {
                if (similarArr.length >= 3) {
                    break;
                }
                if (similarTitleArr[j].description.includes(description.split(' ')[i])) {
                    similarArr.push(similarTitleArr[j]);
                    similarTitleArr.splice(j);
                }
            }
        }
        setAnnouncements(similarArr)
    };

    const showAll = () => {
        setSearch('');
        setAnnouncements(items);
    };

    useEffect(() => {
        searchAnnouncement(search)
    }, [search]);

    useEffect(()=>{
        axios.get(baseUrl + 'posts.json', {}).then(response => {
            setAnnouncements(response.data);
            setItems(response.data);
        })//.catch(e => console.log(e))
    }, [isLoading])


    return (
        <div className='list-box'>
            <AddAnnouncementForm addAnnouncement={addAnnouncement}/>
            <div className='item-list'>
                Announcement List
                <img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNDIuNzE2LDI5My4xNDdsLTk0LTEwNy42MDJsOTQtMTA3LjYwMmM3LjU5Ni04LjcwNSw2LjcxLTIxLjkyNC0xLjk5NS0yOS41MjdjLTguNzA1LTcuNTk2LTIxLjkxNy02LjcwMy0yOS41MjcsMS45OTUNCgkJCUw1LjE2OSwxNzEuNzgyYy02Ljg5Miw3Ljg4Mi02Ljg5MiwxOS42NSwwLDI3LjUzMmwxMDYuMDI2LDEyMS4zNzJjNC4xNDMsNC43MjksOS45NCw3LjE1NywxNS43NzEsNy4xNTcNCgkJCWM0Ljg4MywwLDkuNzg2LTEuNzAyLDEzLjc1NS01LjE2OUMxNDkuNDI3LDMxNS4wNzEsMTUwLjMxOSwzMDEuODUyLDE0Mi43MTYsMjkzLjE0N3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM1OS45MywxNjQuNjE5SDIwLjkyNkM5LjM2OCwxNjQuNjE5LDAsMTczLjk4NiwwLDE4NS41NDVjMCwxMS41NTgsOS4zNjgsMjAuOTI2LDIwLjkyNiwyMC45MjZIMzU5LjkzDQoJCQljNjAuNzc2LDAsMTEwLjIxOCw0OS40NDEsMTEwLjIxOCwxMTAuMjExUzQyMC43MDYsNDI2Ljg5MywzNTkuOTMsNDI2Ljg5M0g0OC44MjhjLTExLjU1OCwwLTIwLjkyNiw5LjM2OC0yMC45MjYsMjAuOTI2DQoJCQljMCwxMS41NTgsOS4zNjgsMjAuOTI2LDIwLjkyNiwyMC45MjZIMzU5LjkzYzgzLjg0NCwwLDE1Mi4wNy02OC4yMTksMTUyLjA3LTE1Mi4wNjNTNDQzLjc4MSwxNjQuNjE5LDM1OS45MywxNjQuNjE5eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                    onClick={() => {
                        showAll()
                    }}
                    title="Show All"
                    style={{width: '20px', marginLeft: "20px"}}
                    alt='Show All'/>

                <input type="text"
                       name='text'
                       value={search}
                       onChange={Search}
                       className='list-search'
                       placeholder='Search'/>
            </div>
            {isLoading&&
            <Spinner/>}
            <AnnouncementList
                Announcements={announcements}
                removeAnnouncement={removeAnnouncement}
                editAnnouncement={editAnnouncement}
                searchAnnouncement={searchAnnouncement}
                findSimilarAnnouncement={findSimilarAnnouncement}
            />

        </div>
    );
};

export default MainPage;
