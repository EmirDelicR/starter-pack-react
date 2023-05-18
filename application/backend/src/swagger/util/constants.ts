import { IMessage } from 'src/interfaces/message';
import {
  ISchema,
  ISwaggerParametersRequest,
  ISwaggerResponse
} from 'src/interfaces/swagger';
import { ITodo } from 'src/interfaces/todo';
import { IUser } from 'src/interfaces/user';

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

export const EXAMPLE_ITEM_DATA: ITodo = {
  completed: false,
  createdAt: new Date(),
  id: 'uuid',
  title: 'Todo title',
  userId: 'user-uuid'
};

export const EXAMPLE_EMAIL_DATA: IMessage = {
  date: new Date().toLocaleString(),
  from: 'john@doe.com',
  id: 'uuid',
  message: 'User email message',
  previewUrl: 'url/to/mail/preview'
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

export const ITEM_ID_PATH_REQ: ISwaggerParametersRequest = {
  in: 'path',
  name: 'id',
  style: 'simple',
  description: 'Item id',
  required: true,
  schema: {
    type: 'string'
  },
  example: 'item-uuid'
};

export const SCHEMA: ISchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      description: 'Response message',
      example: 'Operation was successful'
    },
    status: {
      type: 'number',
      description: 'Response status code',
      example: 200
    },
    data: {
      type: 'object',
      description: 'Response data',
      example: null
    }
  }
};

export const RESPONSE_200: ISwaggerResponse = {
  description: 'Success',
  content: {
    'application/json': {
      schema: SCHEMA
    }
  }
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

export const RESPONSE_ITEM_200: ISwaggerResponse = {
  ...RESPONSE_200,
  content: {
    'application/json': {
      schema: {
        ...SCHEMA,
        properties: {
          ...SCHEMA.properties,
          data: {
            ...SCHEMA.properties.data,
            example: EXAMPLE_ITEM_DATA
          }
        }
      }
    }
  }
};

export const RESPONSE_GET_EMAIL_200: ISwaggerResponse = {
  ...RESPONSE_200,
  content: {
    'application/json': {
      schema: {
        ...SCHEMA,
        properties: {
          ...SCHEMA.properties,
          data: {
            ...SCHEMA.properties.data,
            example: [EXAMPLE_EMAIL_DATA]
          }
        }
      }
    }
  }
};

export const RESPONSE_400: ISwaggerResponse = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Response message',
            example: 'Property must be provided!'
          },
          status: {
            type: 'number',
            description: 'Response status code',
            example: 400
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
};

export const RESPONSE_404: ISwaggerResponse = {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Response message',
            example: 'Property with {id} was not found'
          },
          status: {
            type: 'number',
            description: 'Response status code',
            example: 404
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
};
