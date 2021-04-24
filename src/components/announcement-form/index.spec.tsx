import React from 'react';
import { AddAnnouncementForm } from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AnnouncementItem } from '../announcement-item';
import { Announcement } from '../../shared/types';
import { mocked } from 'ts-jest';

const addAnnouncementsMocked = jest.fn();

const mockedAnnouncement: Announcement = {
  id: 1,
  title: 'sdfsdf',
  description: '',
  dateOfUpdate: new Date().toDateString()
};

describe('AddAnnouncementForm', () => {
  it('renders header', () => {
    const { getByText } = render(<AddAnnouncementForm addAnnouncements={addAnnouncementsMocked}/>);
    expect(getByText('My Announcements')).toBeInTheDocument();
  });
  it('openForm button clicked', () => {
    render(<AddAnnouncementForm addAnnouncements={addAnnouncementsMocked}/>);
    userEvent.click(screen.getByTitle('Add announcement'));
  });
  it('submits the announcement', () => {
    const { getByTitle } = render(<AddAnnouncementForm addAnnouncements={addAnnouncementsMocked}/>);
    fireEvent.click(getByTitle('Add announcement'));
    const titleInput = screen.getByTestId('addTitle');
    expect(titleInput.textContent).toBe('');
    fireEvent.change(titleInput, { target: { value: 'test1' } });
    expect(titleInput).toHaveValue('test1');
    const descInput = screen.getByTestId('addDescription');
    expect(descInput.textContent).toBe('');
    fireEvent.change(descInput, { target: { value: 'test1' } });
    expect(descInput).toHaveValue('test1');
    const btn = screen.getByRole('submitButton');
    fireEvent.click(btn);
    expect(addAnnouncementsMocked).toHaveBeenCalledTimes(1);
  });
  it('discards the form', () => {
    const { getByTitle } = render(<AddAnnouncementForm addAnnouncements={addAnnouncementsMocked}/>);
    fireEvent.click(getByTitle('Add announcement'));
    const btn = screen.getByRole('discardButton');
    fireEvent.click(btn);
  });
  it('edits announcement', () => {
    render(<AddAnnouncementForm addAnnouncements={addAnnouncementsMocked}/>);
    render(<AnnouncementItem announcement={mockedAnnouncement} remove={mocked} editAnnouncement={mocked}/>);
    fireEvent.click(screen.getByRole('editButton'));
    fireEvent.click(screen.getByRole('submitButton'));
  });
  it('edits announcement', () => {
    render(<AddAnnouncementForm addAnnouncements={addAnnouncementsMocked}/>);
    render(<AnnouncementItem announcement={mockedAnnouncement} remove={mocked} editAnnouncement={mocked}/>);
    fireEvent.click(screen.getByRole('editButton'));
    fireEvent.click(screen.getByRole('discardButton'));
  });
});
