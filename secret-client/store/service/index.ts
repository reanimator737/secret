import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TODO = 'http://localhost:8080/api/';

interface IUser {
  id: number;
  address: string;
  avatar?: Blob;
  nickName?: string;
  description?: string;
}

//TODO
interface INeedHelp {
  signMsg: string;
  formData: FormData;
}

export const dataAPI = createApi({
  reducerPath: 'serverData',
  baseQuery: fetchBaseQuery({ baseUrl: TODO }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], any>({ query: () => 'user' }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `user/id/${id}`,
    }),
    getUserByAddress: builder.query<IUser, string>({
      query: (address) => `user/address/${address}`,
      /*
      invalidatesTags: ['User'],
*/
    }),
    createNewUser: builder.mutation<IUser, INeedHelp>({
      query: ({ signMsg, formData }) => {
        return {
          headers: {
            sign: signMsg,
          },
          url: 'user',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLazyGetUserByAddressQuery, useCreateNewUserMutation, useGetUserByAddressQuery } = dataAPI;
