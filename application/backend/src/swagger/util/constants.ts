import {
  ISchema,
  ISwaggerParametersRequest,
  ISwaggerResponse
} from 'src/interfaces/swagger';

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
