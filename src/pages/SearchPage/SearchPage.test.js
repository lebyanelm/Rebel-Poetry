import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchPage from './SearchPage';

describe('<SearchPage />', () => {
  test('it should mount', () => {
    render(<SearchPage />);
    
    const searchPage = screen.getByTestId('SearchPage');

    expect(searchPage).toBeInTheDocument();
  });
});