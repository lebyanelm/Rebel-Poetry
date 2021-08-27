import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecommendedPoems from './RecommendedPoems';

describe('<RecommendedPoems />', () => {
  test('it should mount', () => {
    render(<RecommendedPoems />);
    
    const recommendedPoems = screen.getByTestId('RecommendedPoems');

    expect(recommendedPoems).toBeInTheDocument();
  });
});