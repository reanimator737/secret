import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';
import { dataAPI } from '@/store/service';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    user: userSlice,
    [dataAPI.reducerPath]: dataAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(dataAPI.middleware),
});
//TODO
//@ts-ignore
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
