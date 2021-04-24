import React from 'react';
import { AnnouncementItem } from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Announcement } from '../../shared/types';
import { mocked } from 'ts-jest';

const mockedAnnouncement: Announcement = {
  id: 1,
  title: 'sdfsdf',
  description: '',
  dateOfUpdate: new Date().toDateString()
};

describe('AnnouncementItem', () => {
  it('renders the component', () => {
    render(<AnnouncementItem
      announcement={mockedAnnouncement}
      editAnnouncement={mocked}
      remove={mocked}/>);
    expect(screen.getByText('Title:')).toBeInTheDocument();
  });
  it('clicks on item title', () => {
    render(<AnnouncementItem
      announcement={mockedAnnouncement}
      editAnnouncement={mocked}
      remove={mocked}/>);
    const title = screen.getByRole('showTitle');
    fireEvent.click(title);
  });
  it('clicks on item description', () => {
    render(<AnnouncementItem
      announcement={mockedAnnouncement}
      editAnnouncement={mocked}
      remove={mocked}/>);
    const title = screen.getByRole('showTitle');
    fireEvent.click(title);
    const desc = screen.getByRole('description');
    fireEvent.click(desc);
  });
  it('clicks on item date', () => {
    render(<AnnouncementItem
      announcement={mockedAnnouncement}
      editAnnouncement={mocked}
      remove={mocked}/>);
    const title = screen.getByRole('showTitle');
    fireEvent.click(title);
    const date = screen.getByRole('date');
    fireEvent.click(date);
  });
  it('clicks on edit button', () => {
    render(<AnnouncementItem
      announcement={mockedAnnouncement}
      editAnnouncement={mocked}
      remove={mocked}/>);
    const title = screen.getByRole('showTitle');
    fireEvent.click(title);
    fireEvent.click(screen.getByRole('editButton'));
  });
  it('clicks on delete button', () => {
    render(<AnnouncementItem
      announcement={mockedAnnouncement}
      editAnnouncement={mocked}
      remove={mocked}/>);
    const title = screen.getByRole('showTitle');
    fireEvent.click(title);
    fireEvent.click(screen.getByRole('deleteButton'));
  });
});
