import React from 'react';
import Spinner from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('spinner', () => {
  it('renders the spinner', () => {
    render(<Spinner/>);
  });
});
