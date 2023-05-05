import { configureStore } from '@reduxjs/toolkit';
import user from '@/store/user';
import { dataAPI } from '@/store/service';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    user,
    [dataAPI.reducerPath]: dataAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataAPI.middleware),
});
//TODO
//@ts-ignore
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
