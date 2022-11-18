import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders headerTitle', () => {
  render(<App />);
  const linkElement = screen.getByText('Where in the world ?');
  expect(linkElement).toBeInTheDocument();
});

