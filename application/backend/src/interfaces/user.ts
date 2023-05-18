export interface IUpdateUserBodyRequest {
  age: string;
  avatar: string;
  firstName: string;
  isSubscribed: boolean;
  lastName: string;
  subscriptions: string;
}

export interface IUser extends Omit<IUpdateUserBodyRequest, 'subscriptions'> {
  email: string;
  id: string;
  isLoggedIn: boolean;
  isProfileUpdated: boolean;
  password: string;
  subscriptions: string[];
  token: string | null;
  userName: string;
}

export interface IAuthUserBodyRequest {
  email: string;
  password: string;
}

export interface IJwtTokenData extends IAuthUserBodyRequest {
  iat: number;
  exp: number;
}
