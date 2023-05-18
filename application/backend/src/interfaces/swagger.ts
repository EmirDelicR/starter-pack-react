export interface ISchema {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description: string;
      format?: string;
      example?: any;
    };
  };
  required?: string[];
  example?: {
    [key: string]: string;
  };
}

interface ISwaggerServer {
  url: string;
  description: string;
}

interface ISwaggerTags {
  name: string;
}

type RequestType = 'post' | 'get' | 'patch' | 'delete';

export interface ISwaggerParametersRequest {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  style?: 'form' | 'simple';
  description: string;
  required: boolean;
  schema: {
    type: string;
  };
  example?: any;
}

export interface ISwaggerBodyRequest {
  description: string;
  required: boolean;
  content: {
    'application/json': {
      schema: ISchema;
    };
  };
}

export interface ISwaggerResponse {
  description: string;
  content: {
    'application/json': {
      schema: ISchema;
    };
  };
}

export interface ISwaggerRoutes {
  tags: string[];
  operationId: string;
  description: string;
  produces: string[];
  parameters?: ISwaggerParametersRequest[];
  requestBody?: ISwaggerBodyRequest;
  responses: {
    [key: string]: ISwaggerResponse;
  };
}

export interface ISwaggerMainDocument {
  openapi: string;
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http' | 'https';
        scheme: 'bearer' | 'Bearer';
        bearerFormat: 'JWT';
      };
    };
  };
  security: [
    {
      bearerAuth: string[];
    }
  ];
  info: {
    description: string;
    version: string;
    title: string;
    contact: {
      email: string;
    };
    license: {
      name: string;
      url: string;
    };
  };
  servers: ISwaggerServer[];
  tags: ISwaggerTags[];
  paths: {
    [key: string]: Partial<Record<RequestType, ISwaggerRoutes>>;
  };
}
