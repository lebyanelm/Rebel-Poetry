import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoemActions from './PoemActions';

describe('<PoemActions />', () => {
  test('it should mount', () => {
    render(<PoemActions />);
    
    const poemActions = screen.getByTestId('PoemActions');

    expect(poemActions).toBeInTheDocument();
  });
});