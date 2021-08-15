import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewPoem from './NewPoem';

describe('<NewPoem />', () => {
  test('it should mount', () => {
    render(<NewPoem />);
    
    const newPoem = screen.getByTestId('NewPoem');

    expect(newPoem).toBeInTheDocument();
  });
});