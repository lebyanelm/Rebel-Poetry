import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DraftPreview from './DraftPreview';

describe('<DraftPreview />', () => {
  test('it should mount', () => {
    render(<DraftPreview />);
    
    const draftPreview = screen.getByTestId('DraftPreview');

    expect(draftPreview).toBeInTheDocument();
  });
});