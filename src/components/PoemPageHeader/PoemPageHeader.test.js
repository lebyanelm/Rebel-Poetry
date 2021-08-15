import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoemPageHeader from './PoemPageHeader';

describe('<PoemPageHeader />', () => {
  test('it should mount', () => {
    render(<PoemPageHeader />);
    
    const poemPageHeader = screen.getByTestId('PoemPageHeader');

    expect(poemPageHeader).toBeInTheDocument();
  });
});