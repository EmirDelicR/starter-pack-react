import baseApi from '@/store/services/baseApiSetup';

import { IUserResponse } from './userInterface';

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<
      IUserResponse,
      { formData: FormData; userId: string }
    >({
      query: ({ formData, userId }) => ({
        url: `/user/${userId}`,
        method: 'PATCH',
        body: formData
      })
    })
  })
});

export const { useUpdateUserMutation } = userApiSlice;
