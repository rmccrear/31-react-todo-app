import { useState, useContext } from 'react';
import { Button } from '@blueprintjs/core';
import {When} from 'react-if';
import Login from './Login';
import Signup from './Signup';

import { LoginContext } from './context';

export default function LoginDialog(props) {
  const { loggedIn } = useContext(LoginContext);
  const [mode, setMode] = useState('signin');

  return (
    <div>
      <When condition={mode === 'signin' || loggedIn}> {/** if loggedIn, Login will show logout button */ }
        <Login callback={ props.callback } />
      </When>
      <When condition={mode === 'signup'}>
        <Signup callback={ props.callback} />
      </When>
      <When condition={ !loggedIn }>
        <hr/>
        <Button onClick={() => setMode('signin') }>Signin</Button>
        <Button onClick={() => setMode('signup')}>Signup</Button>
      </When>
    </div>
  );
}