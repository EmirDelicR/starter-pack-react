import { IMessage } from 'src/interfaces/message';
import {
  ISwaggerBodyRequest,
  ISwaggerResponse,
  ISwaggerRoutes
} from 'src/interfaces/swagger';

import { RESPONSE_200, RESPONSE_400, SCHEMA } from 'src/swagger/util/constants';

const EXAMPLE_EMAIL_DATA: IMessage = {
  date: new Date().toLocaleString(),
  from: 'john@doe.com',
  id: 'uuid',
  message: 'User email message',
  previewUrl: 'url/to/mail/preview'
};

const RESPONSE_GET_EMAIL_200: ISwaggerResponse = {
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

const BODY_REQUEST: ISwaggerBodyRequest = {
  description: 'Contact form parameters',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'Email address of the user.',
            format: 'email'
          },
          fullName: {
            type: 'string',
            description: 'Full name of the user.'
          },
          message: {
            type: 'string',
            description: 'Message that user want to send.'
          }
        },
        required: ['email', 'fullName'],
        example: {
          email: 'test@test.com',
          fullName: 'John Doe',
          message: 'Some text message ...'
        }
      }
    }
  }
};

export const sendMessage: ISwaggerRoutes = {
  tags: ['Contact'],
  operationId: 'sendMessage',
  description: 'Send contact message',
  produces: ['application/json'],
  requestBody: BODY_REQUEST,
  responses: {
    200: RESPONSE_200,
    400: RESPONSE_400
  }
};

export const getEmails: ISwaggerRoutes = {
  tags: ['Contact'],
  operationId: 'getEmails',
  description: 'Get list of the emails',
  produces: ['application/json'],
  parameters: [],
  responses: {
    200: RESPONSE_GET_EMAIL_200
  }
};
