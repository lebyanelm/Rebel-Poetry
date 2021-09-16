import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DraftsPage from './DraftsPage';

describe('<DraftsPage />', () => {
  test('it should mount', () => {
    render(<DraftsPage />);
    
    const draftsPage = screen.getByTestId('DraftsPage');

    expect(draftsPage).toBeInTheDocument();
  });
});