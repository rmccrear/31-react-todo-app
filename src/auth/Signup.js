import { useState, useContext } from 'react';

import { LoginContext } from './context.js';

export default function Signup(props) { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const { signup } = useContext(LoginContext);

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) { 
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'role':
        setRole(value);
        break;
      default:
        throw new Error('Form change not handled for' + name);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    signup(username, password, role, props.callback);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="UserName"
          name="username"
          onChange={handleChange}
        />
        <input
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <input 
          data-testid="role-input"
          placeholder="admin, editor, writer, reader"
          name="role"
          onChange={handleChange}
        />
        <input type="submit" value="Sign up" className='bp4-button'/>
      </form>
    </>
  );
}