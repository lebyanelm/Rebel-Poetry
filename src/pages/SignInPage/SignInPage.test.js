import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignInPage from './SignInPage';

describe('<SignInPage />', () => {
  test('it should mount', () => {
    render(<SignInPage />);
    
    const signInPage = screen.getByTestId('SignInPage');

    expect(signInPage).toBeInTheDocument();
  });
});