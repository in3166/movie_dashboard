import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '.';

export interface UserState {
  email: string;
}

const INITIAL_STATE: UserState = {
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setEmail: (state: UserState, action: PayloadAction<string>) => {
      const newColorSet = action.payload;
      document.documentElement.setAttribute('color-theme', newColorSet);
      state.email = newColorSet;
    },
  },
});

export const { setEmail } = userSlice.actions;

export default userSlice.reducer;

export const getEmail = (state: RootState): string => state.user.email;
