import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoemsList from './PoemsList';

describe('<PoemsList />', () => {
  test('it should mount', () => {
    render(<PoemsList />);
    
    const poemsList = screen.getByTestId('PoemsList');

    expect(poemsList).toBeInTheDocument();
  });
});