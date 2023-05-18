import { ISwaggerBodyRequest, ISwaggerRoutes } from 'src/interfaces/swagger';

import {
  RESPONSE_404,
  RESPONSE_USER_200,
  USER_ID_PATH_REQ
} from 'src/swagger/util/constants';

const BODY_REQUEST: ISwaggerBodyRequest = {
  description: 'User parameters',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          age: {
            type: 'string',
            description: 'Age of the user.'
          },
          avatar: {
            type: 'string',
            description: 'Avatar of the user.'
          },
          firstName: {
            type: 'string',
            description: 'First name of the user.'
          },
          lastName: {
            type: 'string',
            description: 'Last name of the user.'
          },
          isSubscribed: {
            type: 'boolean',
            description: 'Is user subscribed flag.'
          },
          subscriptions: {
            type: 'string[]',
            description: 'List of what is user subscribed to.'
          }
        },
        required: ['firstName', 'lastName', 'age', 'avatar'],
        example: {
          age: '12',
          avatar: 'path/to/image',
          firstName: 'John',
          lastName: 'Doe',
          isSubscribed: 'true',
          subscriptions: '["news"]'
        }
      }
    }
  }
};

export const getUser: ISwaggerRoutes = {
  tags: ['User'],
  operationId: 'getUser',
  description: 'Get user',
  produces: ['application/json'],
  parameters: [USER_ID_PATH_REQ],
  responses: {
    200: RESPONSE_USER_200,
    404: RESPONSE_404
  }
};

export const updateUser: ISwaggerRoutes = {
  tags: ['User'],
  operationId: 'updateUser',
  description: 'Update user',
  produces: ['application/json'],
  parameters: [USER_ID_PATH_REQ],
  requestBody: BODY_REQUEST,
  responses: {
    200: RESPONSE_USER_200,
    404: RESPONSE_404
  }
};
