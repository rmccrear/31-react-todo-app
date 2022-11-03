import { LoginContext } from '../auth/context';
import { testUsers } from './testUsers';
// jest.mock('./auth/context');

const mockAdminLoginContextValue = {
  loggedIn: true,
  can: () => true,
  login: (callback)=>callback(),
  logout: () => { },
  user: testUsers.Administrator, // { capabilities: ['create', 'read', 'update', 'delete'] },
  error: null,
}

export const MockAdminLoginProvider = (props) => (
  <LoginContext.Provider value={mockAdminLoginContextValue}>
    {props.children}
  </LoginContext.Provider>
);