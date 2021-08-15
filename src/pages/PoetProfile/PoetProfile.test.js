import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PoetProfile from './PoetProfile';

describe('<PoetProfile />', () => {
  test('it should mount', () => {
    render(<PoetProfile />);
    
    const poetProfile = screen.getByTestId('PoetProfile');

    expect(poetProfile).toBeInTheDocument();
  });
});