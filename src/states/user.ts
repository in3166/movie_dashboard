import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '.';

export interface UserState {
  email: string;
  requestToken: string;
  accessToken: string;
  myListId: string;
}

const INITIAL_STATE: UserState = {
  email: '',
  requestToken: '',
  accessToken: '',
  myListId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (
      state: UserState,
      action: PayloadAction<{ email: string; requestToken: string; accessToken: string; myListId: string }>
    ) => {
      const { email, requestToken, accessToken, myListId } = action.payload;
      state.email = email;
      state.requestToken = requestToken;
      state.accessToken = accessToken;
      state.myListId = myListId;
    },
    setEmail: (state: UserState, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
  },
});

export const { setUser, setEmail } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState): UserState => state.user;
