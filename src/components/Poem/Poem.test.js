import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Poem from './Poem';

describe('<Poem />', () => {
  test('it should mount', () => {
    render(<Poem />);
    
    const poem = screen.getByTestId('Poem');

    expect(poem).toBeInTheDocument();
  });
});