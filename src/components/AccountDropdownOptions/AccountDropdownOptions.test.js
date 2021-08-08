import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountDropdownOptions from './AccountDropdownOptions';

describe('<AccountDropdownOptions />', () => {
  test('it should mount', () => {
    render(<AccountDropdownOptions />);
    
    const accountDropdownOptions = screen.getByTestId('AccountDropdownOptions');

    expect(accountDropdownOptions).toBeInTheDocument();
  });
});