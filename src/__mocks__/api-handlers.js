import { rest } from 'msw'

import { testTodos } from '../__fixtures__/testTodos';

const apiUrl = process.env.REACT_APP_API_URL;

export const apiHandlers = [

  rest.get(`${apiUrl}/todos`, (req, res, ctx)=>{
    return res(
      ctx.status(200),
      ctx.json(
        testTodos
      )
    )
  }),

  rest.get(`${apiUrl}/todos/1`, (req, res, ctx)=>{
    return res(
      ctx.status(200),
      ctx.json(testTodos[0])
    )
  }),

  rest.post(`${apiUrl}/todos`, async (req, res, ctx)=>{
    const body = await req.json();
    return res(
      ctx.status(201),
      ctx.json(
        { ...body, id: 2 }
      )
    )
  }),

  rest.put(`${apiUrl}/todos/1`, async (req, res, ctx)=>{
    const body = await req.json();
    const todo = { ...testTodos[0], ...body, id: 1};
    return res(
      ctx.status(200),
      ctx.json(
        todo
      )
    )
  }),

  rest.delete(`${apiUrl}/todos/1`, async (req, res, ctx)=>{
    return res(
      ctx.status(204),
      ctx.json(1)
    )
  }),

]