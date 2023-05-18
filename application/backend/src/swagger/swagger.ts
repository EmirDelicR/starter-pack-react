import { ISwaggerMainDocument } from 'src/interfaces/swagger';

import { autoLogin, login, register } from 'src/swagger/routes/auth';
import { getEmails, sendMessage } from 'src/swagger/routes/contact';
import {
  addItem,
  deleteItem,
  getItems,
  getPaginatedItems,
  updateItem
} from 'src/swagger/routes/todo';
import { getUser, updateUser } from 'src/swagger/routes/user';

const { PORT, HOST } = process.env;

export const swaggerDocument: ISwaggerMainDocument = {
  openapi: '3.0.0',
  info: {
    description: 'API Documentation for NodeJS API project',
    version: '1.0.0',
    title: 'NODE API',
    contact: {
      email: 'test@test.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: `http://${HOST || 'localhost'}:${PORT || 3100}/`,
      description: 'Local server'
    }
  ],
  paths: {
    '/login': {
      post: login
    },
    '/autoLogin': {
      post: autoLogin
    },
    '/register': {
      post: register
    },
    '/sendMessage': {
      post: sendMessage
    },
    '/getEmails': {
      get: getEmails
    },
    '/user/{id}': {
      get: getUser,
      patch: updateUser
    },
    '/todo': {
      post: addItem
    },
    '/todo/{id}': {
      delete: deleteItem,
      patch: updateItem
    },
    '/todo/{userId}': {
      get: getItems
    },
    '/todo/paginated/{userId}': {
      get: getPaginatedItems
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: 'Auth'
    },
    {
      name: 'User'
    },
    {
      name: 'Contact'
    },
    {
      name: 'Todo'
    }
  ]
};
