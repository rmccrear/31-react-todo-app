// src/mocks/server.js
import { setupServer } from 'msw/node'
import { authHandlers } from './auth-handlers'
import { apiHandlers } from './api-handlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...authHandlers, ...apiHandlers);