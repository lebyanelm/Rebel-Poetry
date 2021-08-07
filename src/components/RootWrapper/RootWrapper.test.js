import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RootWrapper from './RootWrapper';

describe('<RootWrapper />', () => {
  test('it should mount', () => {
    render(<RootWrapper />);
    
    const rootWrapper = screen.getByTestId('RootWrapper');

    expect(rootWrapper).toBeInTheDocument();
  });
});