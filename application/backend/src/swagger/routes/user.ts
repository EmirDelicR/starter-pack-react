import {
  ISwaggerBodyRequest,
  ISwaggerParametersRequest,
  ISwaggerResponse,
  ISwaggerRoutes
} from 'src/interfaces/swagger';
import { IUser } from 'src/interfaces/user';

import { RESPONSE_404, RESPONSE_200, SCHEMA } from 'src/swagger/util/constants';

export const EXAMPLE_USER_DATA: Omit<IUser, 'password'> = {
  age: '12',
  avatar: 'base64:image',
  email: 'test@test.com',
  firstName: 'John',
  id: 'some-uuid',
  isLoggedIn: true,
  isProfileUpdated: false,
  isSubscribed: false,
  lastName: 'Doe',
  subscriptions: ['news'],
  token: 'string | null',
  userName: 'John Doe'
};

export const RESPONSE_USER_200: ISwaggerResponse = {
  ...RESPONSE_200,
  content: {
    'application/json': {
      schema: {
        ...SCHEMA,
        properties: {
          ...SCHEMA.properties,
          data: {
            ...SCHEMA.properties.data,
            example: EXAMPLE_USER_DATA
          }
        }
      }
    }
  }
};

export const USER_ID_PATH_REQ: ISwaggerParametersRequest = {
  in: 'path',
  name: 'id',
  style: 'simple',
  description: 'User id',
  required: true,
  schema: {
    type: 'string'
  },
  example: 'user-uuid'
};

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
