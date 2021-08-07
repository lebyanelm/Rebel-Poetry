import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoetsPage from './PoetsPage';

describe('<PoetsPage />', () => {
  test('it should mount', () => {
    render(<PoetsPage />);
    
    const poetsPage = screen.getByTestId('PoetsPage');

    expect(poetsPage).toBeInTheDocument();
  });
});