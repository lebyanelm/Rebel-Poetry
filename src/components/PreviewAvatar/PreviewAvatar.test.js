import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PreviewAvatar from './PreviewAvatar';

describe('<PreviewAvatar />', () => {
  test('it should mount', () => {
    render(<PreviewAvatar />);
    
    const previewAvatar = screen.getByTestId('PreviewAvatar');

    expect(previewAvatar).toBeInTheDocument();
  });
});