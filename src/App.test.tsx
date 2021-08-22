import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders "Recipes List"', () => {
    render(<App />);
    const contentElement = screen.getByText(/Recipes List/i);
    expect(contentElement).toBeInTheDocument();
  });
});
