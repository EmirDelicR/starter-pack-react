export interface IApiResponse {
  data: unknown;
  status: number;
  message: string;
}

export interface IApiResponseWithToken extends IApiResponse {
  refreshToken: string;
}
