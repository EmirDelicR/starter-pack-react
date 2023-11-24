import {
  ISwaggerBodyRequest,
  ISwaggerResponse,
  ISwaggerRoutes
} from 'src/interfaces/swagger';
import { ITodo } from 'src/interfaces/todo';

import {
  ITEM_ID_PATH_REQ,
  RESPONSE_200,
  RESPONSE_404,
  SCHEMA,
  USER_ID_PATH_REQ
} from 'src/swagger/util/constants';

const EXAMPLE_ITEM_DATA: ITodo = {
  completed: false,
  createdAt: new Date(),
  id: 'uuid',
  title: 'Todo title',
  userId: 'user-uuid'
};

const RESPONSE_ITEM_200: ISwaggerResponse = {
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

const RESPONSE_GET_ITEM_200 = {
  ...RESPONSE_200,
  content: {
    'application/json': {
      schema: {
        ...SCHEMA,
        properties: {
          ...SCHEMA.properties,
          message: {
            type: 'string',
            description: 'Response message',
            example: 'Fetch items successfully'
          },
          data: {
            ...SCHEMA.properties.data,
            example: [{ ...EXAMPLE_ITEM_DATA }]
          }
        }
      }
    }
  }
};

const BODY_ADD_REQUEST: ISwaggerBodyRequest = {
  description: 'Parameters',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Title of the item.'
          },
          userId: {
            type: 'string',
            description: 'Id of the user.'
          }
        },
        required: ['title', 'userId'],
        example: {
          title: 'Title of the item',
          userId: 'user-uuid'
        }
      }
    }
  }
};

const BODY_REQUEST: ISwaggerBodyRequest = {
  description: 'Parameters',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'Id of the user.'
          }
        },
        required: ['userId'],
        example: {
          userId: 'user-uuid'
        }
      }
    }
  }
};

export const getItems: ISwaggerRoutes = {
  tags: ['Todo'],
  operationId: 'getItems',
  description: 'Get user items',
  produces: ['application/json'],
  parameters: [{ ...USER_ID_PATH_REQ, name: 'userId' }],
  responses: {
    200: RESPONSE_GET_ITEM_200
  }
};

export const getPaginatedItems: ISwaggerRoutes = {
  tags: ['Todo'],
  operationId: 'getPaginatedItems',
  description: 'Get user items',
  produces: ['application/json'],
  parameters: [
    { ...USER_ID_PATH_REQ, name: 'userId' },
    {
      in: 'query',
      name: 'page',
      description: 'Current page number',
      required: false,
      schema: {
        type: 'number'
      },
      example: 0
    },
    {
      in: 'query',
      name: 'pageSize',
      description: 'Number of elements on the page',
      required: false,
      schema: {
        type: 'number'
      },
      example: 4
    },
    {
      in: 'query',
      name: 'isMobile',
      description:
        'If is true this will omit pagination and create stacked list on mobile view. (default false)',
      required: false,
      schema: {
        type: 'boolean'
      },
      example: false
    }
  ],
  responses: {
    200: RESPONSE_GET_ITEM_200
  }
};

export const addItem: ISwaggerRoutes = {
  tags: ['Todo'],
  operationId: 'addItem',
  description: 'Add item',
  produces: ['application/json'],
  requestBody: BODY_ADD_REQUEST,
  responses: {
    201: RESPONSE_ITEM_200,
    404: RESPONSE_404
  }
};

export const deleteItem: ISwaggerRoutes = {
  tags: ['Todo'],
  operationId: 'deleteItem',
  description: 'Delete todo',
  produces: ['application/json'],
  parameters: [ITEM_ID_PATH_REQ],
  requestBody: BODY_REQUEST,
  responses: {
    200: RESPONSE_200,
    404: RESPONSE_404
  }
};

export const updateItem: ISwaggerRoutes = {
  tags: ['Todo'],
  operationId: 'updateItem',
  description: 'Update todo',
  produces: ['application/json'],
  parameters: [ITEM_ID_PATH_REQ],
  requestBody: BODY_REQUEST,
  responses: {
    200: RESPONSE_ITEM_200,
    404: RESPONSE_404
  }
};
