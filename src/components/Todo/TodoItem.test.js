import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import TodoItem from "./TodoItem";

import { MockAdminLoginProvider } from '../../__fixtures__/MockLoginProviders';

let callback;

describe('TodoItem', () => {

  beforeAll(() => {
    callback = jest.fn();
   })

  beforeEach(() => { 
    callback.mockClear();
  })

  test('should render item', () => {
    const item = {
      text: 'Do work',
      assignee: 'James',
      difficulty: 1,
      id: 'abc-1001',
      complete: false
    }
    render(
      <MockAdminLoginProvider>
        <TodoItem item={item} toggleComplete={callback} />
      </MockAdminLoginProvider>
    );
    expect(screen.getByText('Do work')).toBeInTheDocument();
    expect(screen.getByText(/James/)).toBeInTheDocument();
  });

  test('should fire callback on toggle complete', async () => {
    const item = {
      text: 'Do work',
      assignee: 'James',
      difficulty: 1,
      id: 'abc-1001',
      complete: false
    }
    render(
      <MockAdminLoginProvider>
        <TodoItem item={item} toggleComplete={callback} />
      </MockAdminLoginProvider>
    );
    expect(screen.getByText('Do work')).toBeInTheDocument();
    expect(screen.getByText(/James/)).toBeInTheDocument();
    expect(screen.getByText(/Complete: false/)).toBeInTheDocument();

    const completeToggleButton = screen.getByTestId('toggle-complete-button');
    expect(completeToggleButton).toBeInTheDocument();
    await userEvent.click(completeToggleButton);
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith(item.id);
  });
});