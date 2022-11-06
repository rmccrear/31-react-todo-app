import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import LoginProvider from './context';
import Signup from "./Signup";


describe('Signup', () => {
  test('should signup admin user', async () => {
    const callback = jest.fn();
    render(
      <LoginProvider>
        <Signup callback={callback} />
      </LoginProvider>
    );
    const usernameInput = screen.getByPlaceholderText('UserName');
    const passwordInput = screen.getByPlaceholderText('password');
    const roleInput  = screen.getByTestId('role-input');
    const loginButton = screen.getByText('Sign up');
    await userEvent.type(usernameInput, 'Administrator2');
    await userEvent.type(passwordInput, 'admin');
    await userEvent.type(roleInput, 'admin');
    await userEvent.click(loginButton);
    expect(callback).toBeCalledWith(expect.objectContaining({status: 'success'}));

    
  });
});