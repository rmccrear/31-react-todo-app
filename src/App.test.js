import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders to do list', () => {
  render(<App />);
  const titleElement = screen.getByText(/To Do List/i);
  expect(titleElement).toBeInTheDocument();
});

test('should Add Todo controls', () => {
  render(<App />);
  expect(screen.getByTestId('item-details-input')).toBeInTheDocument();
  expect(screen.getByTestId('assigned-to-input')).toBeInTheDocument();
  expect(screen.getByTestId('difficulty-slider')).toBeInTheDocument();
});

test('should create a todo', async () => {
  render(<App />);
  const detailsInput = screen.getByTestId('item-details-input');
  const assignInput = screen.getByTestId('assigned-to-input');
  const submitButton = screen.getByTestId('submit-button');
  // const slider = screen.getByTestId('difficulty-slider');

  await userEvent.type(detailsInput, 'Do work');
  await userEvent.type(assignInput, 'James');
  await userEvent.click(submitButton);

  const todoContainer = screen.getByTestId('todos-container');
  expect(todoContainer).toHaveTextContent(/Do work/);
  expect(todoContainer).toHaveTextContent(/Assigned to: James/);

});