import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentsSection from './CommentsSection';

describe('<CommentsSection />', () => {
  test('it should mount', () => {
    render(<CommentsSection />);
    
    const commentsSection = screen.getByTestId('CommentsSection');

    expect(commentsSection).toBeInTheDocument();
  });
});