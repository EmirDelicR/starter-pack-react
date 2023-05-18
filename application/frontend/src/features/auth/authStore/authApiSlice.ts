import baseApi from '@/store/services/baseApiSetup';
import { IUserResponse } from '@/store/userSlice';

export interface IAuthRequestData {
  email: string;
  password: string;
}

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, IAuthRequestData>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials
      })
    }),
    autoLogin: builder.mutation<IUserResponse, string>({
      query: (token) => ({
        url: 'autoLogin',
        method: 'POST',
        body: { token }
      })
    }),
    register: builder.mutation<IUserResponse, IAuthRequestData>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data
      })
    })
  }),
  overrideExisting: false
});

export const { useLoginMutation, useRegisterMutation, useAutoLoginMutation } =
  authApiSlice;
export type authFunctionType = ReturnType<
  typeof authApiSlice.useLoginMutation
>[0];
