import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import TodoList from './TodoList';

let toggleComplete = jest.fn();

describe('TodoList', () => {
  test('it should render TodoList', () => {
    const items = [
      {
        text: 'Do work',
        assignee: 'James',
        difficulty: 1,
        id: 'abc-1001',
        complete: true
      },
      {
        text: 'Do more work',
        assignee: 'Jim',
        difficulty: 2,
        id: 'abc-1002',
        complete: false
      }
    ]
    render(<TodoList items={items} toggleComplete={toggleComplete} />)
    expect(screen.getByText(/James/)).toBeInTheDocument();
    expect(screen.getByText(/Jim/)).toBeInTheDocument();
  });
});