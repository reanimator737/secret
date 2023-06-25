import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserInfo } from '@/interface/user';
import { io } from 'socket.io-client';

const TODO = 'http://localhost:8080/api/';

interface IPost {
  title: string;
  description: string;
  owner: string;
  id: number;
}

//TODO
interface INeedHelp {
  signMsg: string;
  formData: FormData;
}

export interface IRPost {
  id: number;
  title: string;
  description: string;
  reward: number;
  isActive: boolean;
  owner: IUserInfo;
}

export interface ICommentRate {
  id: number;
  is_liked: boolean;
  is_disliked: boolean;
}

export interface IComment {
  id: number;

  owner: IUserInfo;

  text: string;

  hasOwnerLike: boolean;

  commentRates: ICommentRate[];
}

export const dataAPI = createApi({
  reducerPath: 'serverData',
  baseQuery: fetchBaseQuery({ baseUrl: TODO }),
  tagTypes: ['user', 'post', 'comment'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserInfo[], void>({ query: () => 'user' }),

    getAllPosts: builder.query<IRPost[], void>({ query: () => 'order-post' }),

    getPostById: builder.query<IRPost | null, number>({ query: (id) => `order-post/${id}` }),

    getUserById: builder.query<IUserInfo, string>({
      query: (id) => `user/id/${id}`,
    }),

    getUserByAddress: builder.query<IUserInfo, string>({
      query: (address) => `user/address/${address}`,
      /*
      invalidatesTags: ['User'],
*/
    }),

    createNewUser: builder.mutation<IUserInfo, INeedHelp>({
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
      invalidatesTags: ['user'],
    }),

    createNewPost: builder.mutation({
      query(arg: IPost) {
        return {
          url: '/order-post',
          method: 'POST',
          body: arg,
        };
      },
    }),

    //TODO
    addNewComment: builder.mutation({
      query(arg: any) {
        return {
          url: '/comments',
          method: 'POST',
          body: arg,
        };
      },
    }),

    getCategories: builder.query<{ name: string; id: number }[], void>({
      query: () => 'category',
    }),

    getCommentsForPost: builder.query<IComment[], number>({
      query: (id) => `comments/${id}`,
    }),

    getOrderPostConnect: builder.query<any, number>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(orderPostId, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        await cacheDataLoaded;
        const socket = io('http://localhost:8080', {
          withCredentials: true,
        });

        socket.on('connect', () => {
          console.log('connect');
        });

        socket.emit('subscribeToCommentRoom', orderPostId);

        socket.on('newComment', (message) => {
          updateCachedData((draft) => {
            draft.push(message);
          });
        });

        await cacheEntryRemoved;
      },
    }),
  }),
});

export const {
  useLazyGetUserByAddressQuery,
  useCreateNewUserMutation,
  useGetUserByAddressQuery,
  useCreateNewPostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useLazyGetOrderPostConnectQuery,
  useAddNewCommentMutation,
  useGetCategoriesQuery,
  useLazyGetCommentsForPostQuery,
} = dataAPI;
