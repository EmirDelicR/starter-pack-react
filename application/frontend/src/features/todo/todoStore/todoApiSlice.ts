import { ITEMS_PER_PAGE } from '@/constants/api';
import baseApi from '@/store/services/baseApiSetup';

import {
  IApiPaginatedTodoResponse,
  IApiTodoResponse,
  ITodo
} from './todoInterface';

const baseApiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['Todos'] });

export const todoSlice = baseApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], null>({
      query: () => '/todo',
      transformResponse: (res: IApiTodoResponse) => res.data,
      providesTags: ['Todos']
    }),

    getPaginatedTodos: builder.query<
      { items: ITodo[]; numberOfPages: number },
      { userId: string; page?: number; pageSize?: number; isMobile?: boolean }
    >({
      query: ({
        userId,
        page = 0,
        pageSize = ITEMS_PER_PAGE,
        isMobile = false
      }) =>
        `/todo/paginated/${userId}?page=${page}&pageSize=${pageSize}&isMobile=${isMobile}`,
      transformResponse: (res: IApiPaginatedTodoResponse) => res.data,
      providesTags: ['Todos']
    }),

    addTodo: builder.mutation({
      query: (todo: Partial<ITodo>) => ({
        url: '/todo',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),

    updateTodo: builder.mutation({
      query: (todo: ITodo) => ({
        url: `/todo/${todo.id}`,
        method: 'PATCH',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),

    deleteTodo: builder.mutation({
      query: ({ todoId, userId }: { todoId: string; userId: string }) => ({
        url: `/todo/${todoId}`,
        method: 'DELETE',
        body: {
          userId
        }
      }),
      invalidatesTags: ['Todos']
    })
  })
});

export const {
  useGetTodosQuery,
  useGetPaginatedTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoSlice;
