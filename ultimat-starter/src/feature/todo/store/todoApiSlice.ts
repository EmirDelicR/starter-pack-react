import { FetchArgs } from '@reduxjs/toolkit/query';
import baseApi from '@/store/services/baseApi';

interface Todo {
  id: string;
  title: string;
  description: string;
}

interface PaginatedData<T> {
  items: T[];
  numberOfPages: number;
  totalCount: number;
}

interface ApiPaginatedResponse<T> {
  data: PaginatedData<T>;
  message: string;
  status: number;
}

const todoApiSlice = baseApi.enhanceEndpoints({ addTagTypes: ['TodoApiSlice'] }).injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedTodos: builder.query<PaginatedData<Todo>, { limit?: number; offset?: number }>({
      query: ({ limit, offset }) => '/todos',
      transformResponse: (res: ApiPaginatedResponse<Todo>) => res.data,
      providesTags: ['TodoApiSlice'],
    }),
  }),
});

export const { useGetPaginatedTodosQuery } = todoApiSlice;
