import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoemPage from './PoemPage';

describe('<PoemPage />', () => {
  test('it should mount', () => {
    render(<PoemPage />);
    
    const poemPage = screen.getByTestId('PoemPage');

    expect(poemPage).toBeInTheDocument();
  });
});