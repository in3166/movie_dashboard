import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '.';

export interface UserState {
  email: string;
  requestToken: string;
}

const INITIAL_STATE: UserState = {
  email: '',
  requestToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<{ email: string; requestToken: string }>) => {
      const { email, requestToken } = action.payload;
      state.email = email;
      state.requestToken = requestToken;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const getEmail = (state: RootState): UserState => state.user;
