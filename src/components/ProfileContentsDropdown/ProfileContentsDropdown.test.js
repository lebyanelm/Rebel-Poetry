import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfileContentsDropdown from './ProfileContentsDropdown';

describe('<ProfileContentsDropdown />', () => {
  test('it should mount', () => {
    render(<ProfileContentsDropdown />);
    
    const profileContentsDropdown = screen.getByTestId('ProfileContentsDropdown');

    expect(profileContentsDropdown).toBeInTheDocument();
  });
});