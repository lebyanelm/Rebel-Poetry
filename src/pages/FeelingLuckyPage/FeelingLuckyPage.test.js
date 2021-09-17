import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeelingLuckyPage from './FeelingLuckyPage';

describe('<FeelingLuckyPage />', () => {
  test('it should mount', () => {
    render(<FeelingLuckyPage />);
    
    const feelingLuckyPage = screen.getByTestId('FeelingLuckyPage');

    expect(feelingLuckyPage).toBeInTheDocument();
  });
});