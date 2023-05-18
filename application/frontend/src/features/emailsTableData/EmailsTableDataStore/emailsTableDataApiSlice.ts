import { ITEMS_PER_PAGE } from '@/constants/api';
import baseApi from '@/store/services/baseApiSetup';

export interface IMessage {
  id: string;
  from: string | false;
  date: string;
  message: string;
  previewUrl: string | false;
}

export interface IApiPaginatedEmailResponse {
  data: {
    items: IMessage[];
    numberOfPages: number;
  };
  message: string;
  status: number;
}

const baseApiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['Emails'] });

export const contactEmailSlice = baseApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedEmails: builder.query<
      { items: IMessage[]; numberOfPages: number },
      {
        currentPage?: number;
        pageSize?: number;
        id: string;
        desc: boolean;
        filter: string;
      }
    >({
      query: ({
        id,
        currentPage = 0,
        pageSize = ITEMS_PER_PAGE,
        desc = false,
        filter = ''
      }) =>
        `/getEmails/paginated?page=${currentPage}&pageSize=${pageSize}&columnId=${id}&desc=${desc}&filter=${filter}`,
      transformResponse: (res: IApiPaginatedEmailResponse) => res.data,
      providesTags: ['Emails']
    })
  })
});

export const { useGetPaginatedEmailsQuery } = contactEmailSlice;
