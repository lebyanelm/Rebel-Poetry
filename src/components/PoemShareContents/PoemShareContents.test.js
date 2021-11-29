import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoemShareContents from './PoemShareContents';

describe('<PoemShareContents />', () => {
  test('it should mount', () => {
    render(<PoemShareContents />);
    
    const poemShareContents = screen.getByTestId('PoemShareContents');

    expect(poemShareContents).toBeInTheDocument();
  });
});