import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Login from "./Login";
import LoginProvider from './context';

describe('Login', () => {
  test('should Login Admin user', async () => {
    const callback = jest.fn();
    render(
      <LoginProvider>
        <Login callback={callback} />
      </LoginProvider>
    );
    const usernameInput = screen.getByPlaceholderText('UserName');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');
    await userEvent.type(usernameInput, 'Administrator');
    await userEvent.type(passwordInput, 'admin');
    await userEvent.click(loginButton);
    expect(await screen.findByText('Log Out')).toBeInTheDocument();
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith(expect.objectContaining({status: 'success'}));
  });
});