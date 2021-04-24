import React from 'react';
import { AnnouncementList } from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mocked } from 'ts-jest';
import { Announcement } from '../../shared/types';

const Announcements: Array<Announcement> = [
  {
    id: 1,
    title: 'qwerty',
    description: '',
    dateOfUpdate: new Date().toDateString()
  }
];

describe('Announcement List', () => {
  it('renders the component', () => {
    render(<AnnouncementList Announcements={Announcements} removeAnnouncement={mocked} editAnnouncement={mocked}/>);
  });
});
