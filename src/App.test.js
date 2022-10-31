import { render, screen } from '@testing-library/react';
import App from './App';

test('renders to do list', () => {
  render(<App />);
  const linkElement = screen.getByText(/To Do List/i);
  expect(linkElement).toBeInTheDocument();
});
