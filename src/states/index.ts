import { configureStore } from '@reduxjs/toolkit';

import user from './user';
import movies from './moives';

export const store = configureStore({
  reducer: {
    user,
    movies,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
