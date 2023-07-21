import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserInfo } from '@/interface/user';
import { io } from 'socket.io-client';
import { WebSocket } from '@/constants/webSocket';

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

export interface IRPostWithComments extends IRPost {
  comments: IComment[];
}

export interface IComment {
  id: number;

  owner: IUserInfo;

  text: string;

  hasOwnerLike: boolean;

  likesCount: number;
  dislikesCount: number;
}

export interface ICommentCompProps extends IComment {
  hasUserLike: boolean;
  hasUserDislike: boolean;
  removeReactionHandler: (commentId: number) => void;
  addLikeHandler: (commentId: number) => void;
  addDislikeHandler: (commentId: number) => void;
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

        socket.emit(WebSocket.SUBSCRIBE_TO_COMMENT_ROOM, orderPostId);

        socket.on(WebSocket.POST_GET_ALL_DATA, (data: IComment[]) => {
          updateCachedData((draft) => {
            draft.push({ type: WebSocket.POST_GET_ALL_DATA, data });
          });
        });

        socket.on(WebSocket.NEW_COMMENT, (data: any) => {
          updateCachedData((draft) => {
            draft.push({ type: WebSocket.NEW_COMMENT, data });
          });
        });

        socket.on(WebSocket.NEW_REACTION, (data: { comment: IComment; user: IUserInfo; isLiked: boolean }) => {
          updateCachedData((draft) => {
            draft.push({ type: WebSocket.NEW_REACTION, data });
          });
        });

        socket.on(WebSocket.DELETE_REACTION, (data) => {
          updateCachedData((draft) => {
            draft.push({ type: WebSocket.DELETE_REACTION, data });
          });
        });

        await cacheEntryRemoved;
      },
    }),

    getAllUserReactionFromPost: builder.query<any, { id: number; address: string }>({
      query: ({ id, address }) => `order-post/reaction/${id}/${address}`,
    }),

    //TODO
    addLike: builder.mutation({
      query(arg: any) {
        return {
          url: '/comments/like',
          method: 'PATCH',
          body: arg,
        };
      },
    }),

    addDislike: builder.mutation({
      query(arg: any) {
        return {
          url: '/comments/dislike',
          method: 'PATCH',
          body: arg,
        };
      },
    }),

    removeReaction: builder.mutation({
      query(arg: any) {
        return {
          url: '/comments/reaction',
          method: 'DELETE',
          body: arg,
        };
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
  useLazyGetAllUserReactionFromPostQuery,
  useRemoveReactionMutation,
  useAddLikeMutation,
  useAddDislikeMutation,
} = dataAPI;
