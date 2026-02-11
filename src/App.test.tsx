import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page on root route', () => {
  render(<App />);

  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});
