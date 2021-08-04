import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Poet from './Poet';

describe('<Poet />', () => {
  test('it should mount', () => {
    render(<Poet />);
    
    const poet = screen.getByTestId('Poet');

    expect(poet).toBeInTheDocument();
  });
});