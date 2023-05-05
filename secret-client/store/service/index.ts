import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TODO = 'http://localhost:8080/api/';

interface IUser {
  id: number;
  address: string;
  avatar?: string;
  nickName?: string;
  aboutMe?: string;
}

export const dataAPI = createApi({
  reducerPath: 'serverData',
  baseQuery: fetchBaseQuery({ baseUrl: TODO }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[]>({ query: () => 'user', providesTags: 'User' }),

    getUserById: builder.query<IUser, string>({
      query: (id) => `user/id/:${id}`,
      invalidatesTags: ['User'],
    }),

    getUserByAddress: builder.query<IUser, string>({
      query: (address) => `user/address/:${address}`,
      invalidatesTags: ['User'],
    }),

    createNewUser: builder.mutation<IUser, Omit<IUser, 'id'>>({
      query: (arg) => ({
        url: 'user',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIDQuery, useCreateNewUserMutation } = dataAPI;
