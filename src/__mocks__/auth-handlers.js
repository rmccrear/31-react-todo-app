// src/mocks/handlers.js
import { rest } from 'msw'
import base64 from 'base-64';

import { testUsers } from '../__fixtures__/testUsers';

const loginUrl = process.env.REACT_APP_LOGIN_URL;
export const authHandlers = [
  // Handles a POST /login request
  rest.post(`${loginUrl}/signin`, (req, res, ctx) => {
    const headers = req.headers;
    const authHeader = headers.get('authorization')
    const basic = authHeader.split(' ').pop();
    const [username, password] = base64.decode(basic).split(':');
    const user = testUsers[username];
    const token = user.token;
    return res(
      ctx.status(200),
      ctx.json({
        user,
        token
      })
    )
  }),

  rest.post(`${loginUrl}/signup`, async (req, res, ctx) => {
    const { username, password, role } = await req.json();
    if (username && password && role)
      return res(
        ctx.status(200),
        ctx.json({
          username,
          role,
          token: '1234'
        })
      );
    else
      return res(
        ctx.status(403),
      );
  }),
];
