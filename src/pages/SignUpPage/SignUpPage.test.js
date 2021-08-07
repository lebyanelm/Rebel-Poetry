import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpPage from './SignUpPage';

describe('<SignUpPage />', () => {
  test('it should mount', () => {
    render(<SignUpPage />);
    
    const signUpPage = screen.getByTestId('SignUpPage');

    expect(signUpPage).toBeInTheDocument();
  });
});