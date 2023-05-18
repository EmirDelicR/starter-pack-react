import { HTTP_CODE } from '@/constants/api';
import { IError } from '@/interfaces/apiInterface';

export interface IUser {
  age: string;
  avatar: string;
  email: string;
  firstName: string;
  id: string;
  isLoggedIn: boolean;
  isProfileUpdated: boolean;
  isSubscribed: boolean;
  lastName: string;
  subscriptions: string[];
  token: string | null;
  userName: string;
}

export interface IUserState {
  data: IUser;
}

export interface IUserResponse {
  data: IUser;
  status: HTTP_CODE;
  error?: IError;
}
