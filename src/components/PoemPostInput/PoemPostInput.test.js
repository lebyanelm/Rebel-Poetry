import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoemPostInput from './PoemPostInput';

describe('<PoemPostInput />', () => {
  test('it should mount', () => {
    render(<PoemPostInput />);
    
    const poemPostInput = screen.getByTestId('PoemPostInput');

    expect(poemPostInput).toBeInTheDocument();
  });
});