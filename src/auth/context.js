import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

import { signin, signup } from './api';

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      can: this.can,
      login: this.login,
      logout: this.logout,
      signup: this.signup,
      user: { capabilities: [] },
      error: null,
    };
  }

  can = (capability) => {
    return this?.state?.user?.capabilities?.includes(capability);
  }

  signup = async (username, password, role, callback) => {
    const resp = await signup(username, password, role);
    const token = resp.token;
    console.log(resp);
    if (token) {
      const validUser = resp.user;
      this.setLoginState(true, token, validUser);
      callback({ status: 'success' })
    }
    else {
      this.setState({...this.state, error: 'signup error'})
      callback({ status: 'error', resp })
    }
  }

  login = async (username, password, callback) => {
    // let { loggedIn, token, user } = this.state;
    const resp = await signin(username, password);
    const token = resp.token;
    console.log(resp);
    if (token) {
      const validUser = resp.user;
      this.setLoginState(true, token, validUser);
      callback({status: 'success'})
    }
    /*
    let auth = testUsers[username];

    if (auth && auth.password === password) {
      try {
        this.validateToken(auth.token);
        callback({status: 'success'})
      } catch (e) {
        this.setLoginState(loggedIn, token, user, e);
        callback({status: 'error'})
        console.error(e);
      }
    }
    */
  }

  logout = () => {
    this.setLoginState(false, null, {});
  };

  validateToken = token => {
    try {
      let validUser = jwt_decode(token);
      validUser.capabilities = JSON.parse(validUser.capabilities);
      this.setLoginState(true, token, validUser);
    }
    catch (e) {
      this.setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }

  };

  setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user, error: error || null });
  };

  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.validateToken(token);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;