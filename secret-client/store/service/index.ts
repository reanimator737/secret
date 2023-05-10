import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Sign } from 'crypto';

const TODO = 'http://localhost:8080/api/';

interface IUser {
  id: number;
  address: string;
  avatar?: string;
  nickName?: string;
  description?: string;
}

export const dataAPI = createApi({
  reducerPath: 'serverData',
  baseQuery: fetchBaseQuery({ baseUrl: TODO }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], never>({ query: () => 'user', providesTags: 'User' }),

    getUserById: builder.query<IUser, string>({
      query: (id) => `user/id/${id}`,
      invalidatesTags: ['User'],
    }),

    getUserByAddress: builder.query<IUser, string>({
      query: (address) => `user/address/${address}`,
      invalidatesTags: ['User'],
    }),

    createNewUser: builder.mutation<IUser, Omit<IUser, 'id'> | { signMsg: string }>({
      query: (arg) => {
        console.log(arg);
        return {
          headers: {
            sign: arg.signMsg,
          },
          url: 'user',
          method: 'POST',
          body: {
            address: arg.address,
            avatar: arg.avatar ?? null,
            nickName: arg.nickName ?? null,
            description: arg.description ?? null,
          },
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLazyGetUserByAddressQuery, useGetUserByIDQuery, useCreateNewUserMutation } = dataAPI;
