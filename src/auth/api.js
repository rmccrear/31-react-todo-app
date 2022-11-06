import axios from 'axios';


const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

const signupUrl = `${LOGIN_URL}/signup`;
const signinUrl = `${LOGIN_URL}/signin`;
//const logoutUrl = `${LOGIN_URL}/signout`;

export async function signup(username, password, role) {
  const resp = await axios.post(signupUrl, { username, password, role });
  const user = resp.data;
  return user;
}

export async function signin(username, password) {
  const resp = await axios.post(signinUrl, {}, { auth: { username, password } });
  const user = resp.data;
  return user;
}

// export async function signout(token) {
//   return false;
// }
