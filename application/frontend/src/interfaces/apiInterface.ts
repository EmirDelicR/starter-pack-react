import { HTTP_CODE } from '@/constants/api';

export interface IError {
  name?: string;
  status?: HTTP_CODE;
  message?: string;
}

export interface IApiErrorResponse {
  data: {
    data: unknown;
    message: string;
    status: HTTP_CODE;
  };
}
