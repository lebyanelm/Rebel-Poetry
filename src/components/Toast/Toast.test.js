import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toast from './Toast';

describe('<Toast />', () => {
  test('it should mount', () => {
    render(<Toast />);
    
    const toast = screen.getByTestId('Toast');

    expect(toast).toBeInTheDocument();
  });
});