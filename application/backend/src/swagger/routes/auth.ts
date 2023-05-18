import { ISwaggerBodyRequest, ISwaggerRoutes } from 'src/interfaces/swagger';

import {
  RESPONSE_400,
  RESPONSE_404,
  RESPONSE_USER_200
} from 'src/swagger/util/constants';

const BODY_REQUEST: ISwaggerBodyRequest = {
  description: 'User auth parameters',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'Email address of the user.'
          },
          password: {
            type: 'string',
            description: 'Password of the user.'
          }
        },
        required: ['email', 'password'],
        example: {
          email: 'test_swagger@test.com',
          password: 'StrongPassword!1234'
        }
      }
    }
  }
};

export const login: ISwaggerRoutes = {
  tags: ['Auth'],
  operationId: 'login',
  description: 'Login user',
  produces: ['application/json'],
  requestBody: BODY_REQUEST,
  responses: {
    200: RESPONSE_USER_200,
    400: RESPONSE_400,
    404: RESPONSE_404
  }
};

export const autoLogin: ISwaggerRoutes = {
  tags: ['Auth'],
  operationId: 'autoLogin',
  description: 'Login user',
  produces: ['application/json'],
  requestBody: {
    description: 'User auth parameters',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'User token.'
            }
          },
          required: ['token'],
          example: {
            token: 'user-login-token'
          }
        }
      }
    }
  },
  responses: {
    200: RESPONSE_USER_200,
    400: RESPONSE_400,
    403: {
      description: 'Forbidden',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Response message',
                example: 'Token expired, login again!'
              },
              status: {
                type: 'number',
                description: 'Response status code',
                example: 403
              },
              data: {
                type: 'object',
                description: 'Response data',
                example: null
              }
            }
          }
        }
      }
    },
    404: RESPONSE_404
  }
};

export const register: ISwaggerRoutes = {
  tags: ['Auth'],
  operationId: 'register',
  description: 'Register user',
  produces: ['application/json'],
  requestBody: BODY_REQUEST,
  responses: {
    201: RESPONSE_USER_200,
    400: RESPONSE_400,
    409: {
      description: 'Not Found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Response message',
                example: 'User already exist. Please login!'
              },
              status: {
                type: 'number',
                description: 'Response status code',
                example: 409
              },
              data: {
                type: 'object',
                description: 'Response data',
                example: null
              }
            }
          }
        }
      }
    }
  }
};
