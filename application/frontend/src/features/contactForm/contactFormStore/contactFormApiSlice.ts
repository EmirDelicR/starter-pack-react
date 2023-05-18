import baseApi from '@/store/services/baseApiSetup';

export interface IContactFormMessage {
  email: string;
  message: string;
  fullName: string;
}

const baseApiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['Emails'] });

export const contactFormSlice = baseApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data: IContactFormMessage) => ({
        url: '/sendMessage',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Emails']
    })
  })
});

export const { useSendMessageMutation } = contactFormSlice;
