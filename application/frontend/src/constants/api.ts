export enum HTTP_CODE {
  CODE_200 = 200,
  CODE_201 = 201,
  CODE_204 = 204,
  CODE_300 = 300,
  CODE_301 = 301,
  CODE_302 = 302,
  CODE_400 = 400,
  CODE_401 = 401,
  CODE_403 = 403,
  CODE_404 = 404,
  CODE_500 = 500,
  CODE_501 = 501
}

export enum HTTP_PROTOCOL {
  HTTP = 'http',
  HTTPS = 'https'
}

export enum HTTP_PORT {
  HTTP = 3100,
  HTTPS = 443
}

export const API_URL = `${HTTP_PROTOCOL.HTTP}://localhost:${HTTP_PORT.HTTP}`;

export const ITEMS_PER_PAGE = 5;
